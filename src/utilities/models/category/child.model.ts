import { flow, getParent, getType, Instance, types } from 'mobx-state-tree';
import {
  BaseCategory,
  BaseCategoryInstance,
  CategoryImages
} from 'utilities/models/category/base.model';
import { ImagesResponse } from 'utilities/types';
import { baseRouter } from 'utilities/router';

export const ChildCategory = types
  .compose(BaseCategory, CategoryImages)
  .named('ChildCategory')
  .views((self) => ({
    get name() {
      return self.id.split('-')[1];
    },
    get parent(): BaseCategoryInstance {
      return getParent(getParent(self));
    }
  }))
  .views((self) => ({
    get url() {
      return `/breed/${self.parent.name}/${self.name}/images`;
    }
  }))
  .actions((self) => ({
    // TODO: Refactor this with singleton
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

export interface ChildCategoryInstance extends Instance<typeof ChildCategory> {}

export const isChildCategory = (obj: any): obj is ChildCategoryInstance =>
  getType(obj) === ChildCategory;
