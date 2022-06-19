import { types } from 'mobx-state-tree';
import { BreedBaseModel } from './breed--base.model';

export const BreedParentModel = types
  .compose(types.model({}), BreedBaseModel)
  .named('BreedParentModel');
