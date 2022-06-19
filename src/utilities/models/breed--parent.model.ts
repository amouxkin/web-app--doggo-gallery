import { types } from 'mobx-state-tree';
import { BreedBaseModel } from './breed--base.model';
import { BreedSubModel } from './breed--sub.model';

export const BreedParentModel = types
  .compose(
    types.model({
      subBreeds: types.array(BreedSubModel)
    }),
    BreedBaseModel
  )
  .named('BreedParentModel')
  .actions((self) => ({
    select: () => {
      self.isSelected = true;
      self.subBreeds.forEach((subBreed) => subBreed.select());
    },
    unSelect: () => {
      self.isSelected = false;
      self.subBreeds.forEach((subBreed) => subBreed.unSelected());
    }
  }));
