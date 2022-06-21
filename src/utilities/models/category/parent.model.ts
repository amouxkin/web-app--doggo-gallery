import { flow, getType, Instance, types } from 'mobx-state-tree';
import { BaseCategory } from 'utilities/models/category/base.model';
import { ChildCategory, ChildCategoryInstance } from 'utilities/models/category/child.model';
import { ImagesResponse } from 'utilities/types';
import { baseRouter } from 'utilities/router';

export const ParentCategory = BaseCategory.props({
  children: types.map(ChildCategory)
})
  .named('ParentCategoryModel')
  .views((self) => ({
    get url() {
      return `/breed/${self.name}/images`;
    },
    get childrenArray() {
      return Array.from(self.children.values());
    }
  }))
  .actions((self) => ({
    addChildren: (...children: ChildCategoryInstance[]) =>
      children.forEach((child) => self.children.set(child.id, child)),
    selectChildren: () => self.children.forEach((child) => child.select()),
    unSelectChildren: () => self.children.forEach((child) => child.unSelect()),
    fetchImages: flow(function* () {
      self.setFetching();

      try {
        const { message }: ImagesResponse = yield baseRouter.url(self.url).get().json();
        /**
         * Clearing old images
         */
        self.children.forEach((subBreed) => subBreed.clear());

        message.forEach((imageUrl) => {
          const id = imageUrl.split('/').splice(4, 1)[0];
          self.children.get(id)?.pushImages(imageUrl);
        });
        /**
         * So they do not have to re-fetch
         */
        self.children.forEach((subBreed) => subBreed.setSuccess());
        self.setSuccess();
      } catch (e) {
        self.setFailed();
      }
    })
  }))
  .views((self) => ({
    get someChildrenSelected() {
      return self.childrenArray.some((child) => child.isSelected);
    },
    get allChildrenSelected() {
      return self.childrenArray.every((child) => child.isSelected);
    }
  }))
  .views((self) => ({
    get isIndeterminate() {
      return self.someChildrenSelected && !self.allChildrenSelected;
    }
  }))
  .actions((self) => ({
    fetchSelectedChildrenImages: () => {
      if (self.isIndeterminate) {
        self.children.forEach((child) => {
          child.isSelected && child.fetchImages();
        });
      }
    }
  }));

export interface ParentCategoryInstance extends Instance<typeof ParentCategory> {}

export const isParentCategory = (obj: any): obj is ParentCategoryInstance =>
  getType(obj) === ParentCategory;
