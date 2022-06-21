import { flow, Instance, types } from 'mobx-state-tree';
import { ImagesResponse } from 'utilities/types';
import { baseRouter } from 'utilities/router';
import { interlace } from 'utilities/helpers';
import { BreedBaseModel } from './breed--base.model';
import { BreedSubModel } from './breed--sub.model';

export const BreedParentModel = types
  .compose(
    types.model({
      subBreeds: types.array(BreedSubModel)
    }),
    BreedBaseModel
  )
  .named('BreedParentModel')
  .views((self) => ({
    get url() {
      return `/breed/${self.name}/images`;
    },
    get anySubBreedFiltered() {
      return self.subBreeds.some((subBreed) => subBreed.isFiltered);
    },
    get everySubBreedFiltered() {
      return self.subBreeds.every((subBreed) => subBreed.isFiltered);
    }
  }))
  .actions((self) => ({
    select: () => {
      self.isSelected = true;
      self.subBreeds.forEach((subBreed) => subBreed.select());
    },
    unSelect: () => {
      self.isSelected = false;
      self.subBreeds.forEach((subBreed) => subBreed.unSelect());
    },
    filter: () => {
      self.isFiltered = true;
      self.subBreeds.forEach((subBreed) => subBreed.unFilter());
    },
    unFilter: () => {
      self.isFiltered = false;
      self.subBreeds.forEach((subBreed) => subBreed.unFilter());
    },
    unSelectJustParent: () => {
      self.isSelected = false;
    },
    fetchImages: flow(function* () {
      self.setFetching();

      try {
        const { message }: ImagesResponse = yield baseRouter.url(self.url).get().json();
        self.subBreeds.forEach((subBreed) => subBreed.clear());

        message.forEach((imageUrl) => {
          const [, imageSubBreed] = imageUrl.split('/').splice(4, 1)[0].split('-');
          self.subBreeds.find((subBreed) => subBreed.name === imageSubBreed)?.pushImage(imageUrl);
        });

        self.setSuccess();
      } catch (e) {
        self.setFailed();
      }
    })
  }))
  .views((self) => ({
    get anySubBreedSelected() {
      return self.subBreeds.some((subBreed) => subBreed.isSelected);
    },
    get allSubBreedSelected() {
      return self.subBreeds.every((subBreed) => subBreed.isSelected);
    },
    get images() {
      return interlace(
        ...self.subBreeds
          .filter((subBreed) => subBreed.isSelected)
          .map((subBreed) => subBreed.images)
      );
    }
  }))
  .actions((self) => ({
    fetchSubImages: () => {
      self.subBreeds
        .filter((subBreed) => subBreed.isSelected)
        .forEach((subBreed) => subBreed.fetchImages());
    }
  }));

export interface BreedParentModelInstance extends Instance<typeof BreedParentModel> {}
