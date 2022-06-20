import { CategoriesStore } from 'store';
import { apiGetRequest } from 'mocks';
import { expect } from 'vitest';

describe('CategoriesStore', () => {
  apiGetRequest('breeds/list', {
    status: 'success',
    message: {
      appenzeller: [],
      australian: ['shepherd']
    }
  });

  it('should fetch categories correctly', async () => {
    const store = CategoriesStore.create();
    await store.fetchCategories();

    expect(store.state).toBe('success');
  });
});
