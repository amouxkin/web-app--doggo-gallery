import { flow, getParent, types } from 'mobx-state-tree';
import { BreedBaseModel, BreedBaseModelInstance } from './breed--base.model';
import { ImagesResponse } from 'utilities/types';
import { baseRouter } from 'utilities/router';

export const BreedSubModel = types
  .compose(
    types.model({
      images: types.array(types.string)
    }),
    BreedBaseModel
  )
  .named('BreedSubModel')
  .views((self) => ({
    get name() {
      return self.id.split('-')[1];
    },
    get parent() {
      return getParent<BreedBaseModelInstance>(self);
    }
  }))
  .views((self) => ({
    get url() {
      return `/breed/${self.parent.name}/${self.name}/images`;
    }
  }))
  .actions((self) => ({
    clear: () => {
      self.images.clear();
    },
    pushImage: (imageUrls: string) => {
      self.images.push(imageUrls);
    }
  }))
  .actions((self) => ({
    fetchImages: flow(function* () {
      self.setFetching();
      try {
        const { message }: ImagesResponse = yield baseRouter.url(self.url).get().json();
        self.images.clear();
        self.images.push(...message);
        self.setSuccess();
      } catch (e) {
        self.setFailed();
      }
    })
  }));
