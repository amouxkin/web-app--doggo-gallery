import { getParent, Instance, types } from 'mobx-state-tree';
import {
  BaseCategory,
  BaseCategoryInstance,
  CategoryImages
} from 'utilities/models/category/base.model';

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
  }));

export interface ChildCategoryInstance extends Instance<typeof ChildCategory> {}
