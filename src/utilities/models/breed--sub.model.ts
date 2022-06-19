import { types } from 'mobx-state-tree';
import { BreedBaseModel } from './breed--base.model';
import { BreedParentModel } from './breed--parent.model';

export const BreedSubModel = types
  .compose(
    types.model({
      parent: types.reference(types.late(() => BreedParentModel))
    }),
    BreedBaseModel
  )
  .named('BreedSubModel')
  .views((self) => ({
    get name() {
      return self.id.split('-')[1];
    }
  }))
  .actions((self) => ({}));
