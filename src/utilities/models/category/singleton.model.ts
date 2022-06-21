import { flow, Instance, types } from 'mobx-state-tree';
import { BaseCategory, CategoryImages } from 'utilities/models/category/base.model';
import { ImagesResponse } from 'utilities/types';
import { baseRouter } from 'utilities/router';

export const SingletonCategory = types
  .compose(BaseCategory, CategoryImages)
  .named('SingletonCategoryModel')
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
        self.pushImages(...message);
        self.setSuccess();
      } catch (e) {
        self.setFailed();
      }
    })
  }));

export interface SingletonCategoryInstance extends Instance<typeof SingletonCategory> {}
