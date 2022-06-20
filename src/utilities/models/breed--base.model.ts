import { flow, Instance, types } from 'mobx-state-tree';
import { ApiStateModel } from './api-state.model';

export const BreedBaseModel = types
  .compose(
    types
      .model({
        id: types.identifier,
        isSelected: types.optional(types.boolean, false)
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
  .named('BreedBaseModel')
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

export interface BreedBaseModelInstance extends Instance<typeof BreedBaseModel> {}
