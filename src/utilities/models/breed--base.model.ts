import { types } from 'mobx-state-tree';
import { ApiStateModel } from './api-state.model';

export const BreedBaseModel = types
  .compose(
    types
      .model({
        id: types.identifier,
        images: types.array(types.string),
        isSelected: types.optional(types.boolean, false)
      })
      .views((self) => ({
        get name() {
          return self.id;
        }
      })),
    ApiStateModel
  )
  .named('BreedBaseModel');
