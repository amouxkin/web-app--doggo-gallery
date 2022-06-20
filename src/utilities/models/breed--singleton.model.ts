import { flow, Instance, types } from 'mobx-state-tree';
import { BreedBaseModel } from './breed--base.model';
import { ImagesResponse } from 'utilities/types';
import { baseRouter } from 'utilities/router';

export const BreedSingletonModel = types
  .compose(
    types.model({
      images: types.array(types.string)
    }),
    BreedBaseModel
  )
  .named('BreedSingletonModel')
  .views((self) => ({
    get url() {
      return `/breed/${self.name}/images`;
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

export interface BreedSingletonModelInstance extends Instance<typeof BreedSingletonModel> {}
