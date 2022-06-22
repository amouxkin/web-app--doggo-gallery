import { types } from 'mobx-state-tree';
import { ApiState } from 'utilities/enums/ApiState';

export const ApiStateModel = types
  .model('ApiStateModel', {
    state: types.optional(types.enumeration(Object.values(ApiState)), ApiState.idle)
  })
  .views((self) => ({
    get fetchSucceeded() {
      return self.state === ApiState.success;
    },
    get fetchLoading() {
      return self.state === ApiState.fetching;
    }
  }))
  .actions((self) => ({
    setFetching: () => {
      self.state = ApiState.fetching;
    },
    setSuccess: () => {
      self.state = ApiState.success;
    },
    setFailed: () => {
      self.state = ApiState.failed;
    },
    setIdle: () => {
      self.state = ApiState.idle;
    }
  }));
