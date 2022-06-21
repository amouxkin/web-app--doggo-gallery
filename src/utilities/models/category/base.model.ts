import { flow, Instance, types } from 'mobx-state-tree';
import { ApiStateModel } from 'utilities/models';
import { optionalBoolean } from 'utilities/models/model-types';

export const BaseCategory = types
  .compose(
    types
      .model({
        id: types.identifier,
        isSelected: optionalBoolean
      })
      .actions((self) => ({
        select: () => {
          self.isSelected = true;
        },
        unSelect: () => {
          self.isSelected = false;
        }
      }))
      .views((self) => ({
        get name() {
          return self.id;
        }
      })),
    ApiStateModel
  )
  .named('BaseCategoryModel')
  .views((self) => ({
    get url() {
      throw new Error(`Implement "url" view`);
    }
  }))
  .actions((self) => ({
    fetchImages: flow(function* () {
      throw new Error(`Implement "fetchImages"`);
    })
  }));

export interface BaseCategoryInstance extends Instance<typeof BaseCategory> {}

/**
 * {images} property for Singleton categories and Sub Categories.
 */
export const CategoryImages = types
  .model({
    images: types.map(types.string)
  })
  .actions((self) => ({
    clear: () => self.images.clear(),
    pushImages: (...images: string[]) =>
      images.forEach((image) => self.images.set(image.split('/').pop()!, image))
  }));

export interface CategoryImagesInstance extends Instance<typeof CategoryImages> {}
