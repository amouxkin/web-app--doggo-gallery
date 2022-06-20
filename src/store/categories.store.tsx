import { types } from 'mobx-state-tree';

export const CategoriesStore = types.model({
	categories: types.array()
})
