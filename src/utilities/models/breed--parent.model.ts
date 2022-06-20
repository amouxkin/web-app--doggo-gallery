import { flow, types } from 'mobx-state-tree';
import { BreedBaseModel } from './breed--base.model';
import { BreedSubModel } from './breed--sub.model';
import { ImagesResponse } from 'utilities/types';
import { baseRouter } from 'utilities/router';

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
    }
  }))
  .actions((self) => ({
    select: () => {
      self.isSelected = true;
      self.subBreeds.forEach((subBreed) => subBreed.select());
    },
    unSelect: () => {
      self.isSelected = false;
      self.subBreeds.forEach((subBreed) => subBreed.unSelected());
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
  }));
