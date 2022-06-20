import { BreedSingletonModel } from 'utilities/models';
import { apiGetRequest } from 'mocks';

describe('BreedSingletonModel', () => {
  apiGetRequest('breed/african/images', {
    status: 'success',
    message: ['https://images.dog.ceo/breeds/african/n02116738_10024.jpg']
  });

  const singleton = BreedSingletonModel.create({ id: 'african' });

  it('should create without any issues', async () => {
    expect(singleton.state).toBe('idle');

    await singleton.fetchImages();

    expect(singleton.state).toBe('success');
    expect(singleton.images.length).toBe(1);
  });
});
