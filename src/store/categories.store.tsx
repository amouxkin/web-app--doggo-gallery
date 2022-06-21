import { createContext, FC, ProviderProps, useContext, useRef } from 'react';
import { flow, Instance, types } from 'mobx-state-tree';
import {
  ApiStateModel,
  BreedSingletonModel,
  ChildCategory,
  ParentCategory,
  SingletonCategory
} from 'utilities/models';
import { baseRouter } from 'utilities/router';
import { BreedsResponse } from 'utilities/types';

export const CategoriesStore = types
  .compose(
    types.model({
      categories: types.map(types.union(ParentCategory, SingletonCategory))
    }),
    ApiStateModel
  )
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
    })
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
