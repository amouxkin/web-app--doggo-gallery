import { CategoriesStore } from 'store';
import { apiGetRequest } from 'mocks';
import { expect } from 'vitest';
import { runInAction } from 'mobx';
import { skipCycle } from 'mocks';

describe('CategoriesStore', () => {
  apiGetRequest('breeds/list/all', {
    status: 'success',
    message: {
      appenzeller: [],
      cattledog: ['australian']
    }
  });

  apiGetRequest('breed/appenzeller/images', {
    status: 'success',
    message: ['https://images.dog.ceo/breeds/appenzeller/n02107908_1575.jpg']
  });

  apiGetRequest('breed/cattledog/australian/images', {
    status: 'success',
    message: ['https://images.dog.ceo/breeds/cattledog-australian/IMG_4386.jpg']
  });

  const store = CategoriesStore.create();

  it('should fetch categories correctly', async () => {
    await store.fetchCategories();

    expect(store.state).toBe('success');
  });

  it('should fetch nothing if no image is selected', async () => {
    await store.fetchSelectedImages();
    expect(store.categories[0].images).toStrictEqual([]);
    expect(store.categories[1].images).toStrictEqual([]);
  });

  it('should fetch selected singleton', async () => {
    store.categories[0].select();
    await runInAction(store.fetchSelectedImages);

    /**
     * Two cycles for mocks to be resolved.
     */
    await skipCycle();
    await skipCycle();

    expect(store.categories[0].state).toBe('success');
    expect(store.categories[0].images.length).toBe(1);
    expect(store.categories[1].images.length).toBe(0);
  });
});
