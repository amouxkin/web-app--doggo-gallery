import { types } from 'mobx-state-tree';

export const ApiStateModel = types
  .model('ApiStateModel', {
    state: types.optional(types.enumeration(['fetching', 'success', 'failed', 'idle']), 'idle')
  })
  .actions((self) => ({
    setFetching: () => {
      self.state = 'fetching';
    },
    setSuccess: () => {
      self.state = 'success';
    },
    setFailed: () => {
      self.state = 'failed';
    },
    setIdle: () => {
      self.state = 'idle';
    }
  }));
