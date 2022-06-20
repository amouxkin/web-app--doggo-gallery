import { flow, getType, Instance, types } from 'mobx-state-tree';
import {
  ApiStateModel,
  BreedParentModel,
  BreedParentModelInstance,
  BreedSingletonModel,
  BreedSubModel
} from 'utilities/models';
import { baseRouter } from 'utilities/router';
import { BreedsResponse } from 'utilities/types';
import { interlace } from 'utilities/helpers';
import { createContext, FC, ProviderProps, useContext, useRef } from 'react';

export const CategoriesStore = types
  .compose(
    types.model({
      categories: types.array(types.union(BreedParentModel, BreedSingletonModel))
    }),
    ApiStateModel
  )
  .named('CategoriesStore')
  .views((self) => ({
    get images() {
      return interlace(
        ...self.categories
          .filter((category) => {
            if (getType(category) === BreedSingletonModel) return category.isSelected;
            return (category as BreedParentModelInstance).anySubBreedSelected;
          })
          .map((category) => category.images)
      );
    },
    get isAnyFetching() {
      return self.categories.some((category) => {
        if (getType(category) === BreedSingletonModel) return category.state === 'fetching';
        return (
          (category as BreedParentModelInstance).anySubBreedSelected ||
          category.state === 'fetching'
        );
      });
    }
  }))
  .actions((self) => ({
    fetchCategories: flow(function* () {
      self.setFetching();

      try {
        const { message }: BreedsResponse = yield baseRouter.url('/breeds/list/all').get().json();
        self.categories.clear();
        for (let breedName in message) {
          const subBreeds = message[breedName]?.map((subBreed) =>
            BreedSubModel.create({ id: `${breedName}-${subBreed}` })
          );

          if (subBreeds.length > 0) {
            self.categories.push(
              BreedParentModel.create({
                id: breedName,
                subBreeds
              })
            );
          } else {
            self.categories.push(
              BreedSingletonModel.create({
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
    fetchSelectedImages: flow(function* () {
      self.categories.forEach((category) => {
        if (['fetching', 'success'].includes(category.state)) return;
        if (category.isSelected) category.fetchImages();

        if (getType(category) === BreedParentModel) {
          (category as BreedParentModelInstance).fetchSubImages();
        }
      });
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
