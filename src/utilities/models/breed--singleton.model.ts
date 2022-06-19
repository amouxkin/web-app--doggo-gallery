import { types } from 'mobx-state-tree';
import { BreedBaseModel } from './breed--base.model';

export const BreedSingletonModel = types
  .compose(types.model({}), BreedBaseModel)
  .named('BreedSingletonModel')
  .views((self) => ({
    get url() {
      return `/breed/${self.name}/images`;
    }
  }));
