import { createContext, FC, ProviderProps, useContext, useRef } from 'react';
import { cast, castToReferenceSnapshot, flow, Instance, types } from 'mobx-state-tree';
import {
  ApiStateModel,
  ChildCategory,
  ChildCategoryInstance,
  isParentCategory,
  ParentCategory,
  ParentCategoryInstance,
  SingletonCategory,
  SingletonCategoryInstance
} from 'utilities/models';
import { baseRouter } from 'utilities/router';
import { BreedsResponse } from 'utilities/types';
import { interlace } from 'utilities/helpers';

export const CategoriesStore = types
  .compose(
    types.model({
      categories: types.map(types.union(ParentCategory, SingletonCategory)),
      selectedCategories: types.array(
        types.reference(types.union(ParentCategory, SingletonCategory, ChildCategory))
      )
    }),
    ApiStateModel
  )
  .actions((self) => ({
    setSelectedCategories: (
      newSelected: (ChildCategoryInstance | SingletonCategoryInstance | ParentCategoryInstance)[]
    ) => {
      self.selectedCategories.clear();
      newSelected.forEach((selected) => {
        self.selectedCategories.push(selected);
      });
    }
  }))
  .views((self) => ({
    /**
     * For Input Selection.
     */
    get categoriesAsOptions() {
      return Array.from(self.categories.values()).reduce((list, category) => {
        list.push({ label: category.id, value: category });

        if (isParentCategory(category)) {
          category.children.forEach((child) => list.push({ label: child.id, value: child }));
        }
        return list;
      }, [] as Array<{ label: string; value: ChildCategoryInstance | SingletonCategoryInstance | ParentCategoryInstance }>);
    },
    get interlacedSelectedImages() {
      return interlace(
        ...Array.from(self.categories.values()).map((category) =>
          isParentCategory(category)
            ? category.interlacedSelectedImages
            : category.isSelected
            ? Array.from(category.images.values())
            : []
        )
      );
    }
  }))
  .named('CategoriesStore')
  .actions((self) => ({
    fetchCategories: flow(function* () {
      self.setFetching();

      try {
        const { message }: BreedsResponse = yield baseRouter.url('/breeds/list/all').get().json();

        self.categories.clear();
        for (let breedName in message) {
          const subBreeds = message[breedName]?.map((subBreed) =>
            ChildCategory.create({ id: `${breedName}-${subBreed}` })
          );

          if (subBreeds.length > 0) {
            const category = ParentCategory.create({
              id: breedName
            });
            self.categories.set(breedName, category);
            category.addChildren(...subBreeds);
          } else {
            self.categories.set(
              breedName,
              SingletonCategory.create({
                id: breedName
              })
            );
          }
        }
        self.setSuccess();
      } catch (e) {
        self.setFailed();
        throw e;
      }
    }),
    fetchSelectedImages: () => {
      self.categories.forEach((category) => {
        /**
         * If it's a parent, if it's selected only run fetchImages for those. But if only a few of it's children
         * are selected, just run for those.
         */
        if (isParentCategory(category)) {
          if (category.isSelected || category.allChildrenSelected) {
            !category.fetchSucceeded && category.fetchImages();
          } else if (category.isIndeterminate) {
            category.children.forEach((child) => {
              !child.fetchSucceeded && child.fetchImages();
            });
          }
        } else {
          if (category.isSelected && !category.fetchSucceeded) category.fetchImages();
        }
      });
    }
  }));

export interface CategoriesStoreInstance extends Instance<typeof CategoriesStore> {}

export const BreedStore = createContext<CategoriesStoreInstance>(null!);

export const BreedStoreProvider: FC<Omit<ProviderProps<CategoriesStoreInstance>, 'value'>> = (
  props
) => {
  const breedStore = useRef(CategoriesStore.create());
  return <BreedStore.Provider value={breedStore.current} {...props} />;
};

export const useBreedStore = () => useContext(BreedStore);
