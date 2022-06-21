import { types } from 'mobx-state-tree';

export const optionalBoolean = types.optional(types.boolean, false);
