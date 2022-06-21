import { BreedSubModel, BreedParentModel } from 'utilities/models';
import { apiGetRequest } from 'mocks';

describe('BreedSubModel', () => {
  apiGetRequest('breed/hound/afghan/images', {
    status: 'success',
    message: ['https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg']
  });

  apiGetRequest('breed/hound/images', {
    status: 'success',
    message: ['https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg']
  });

  apiGetRequest('breed/hound/images', {
    status: 'success',
    message: ['https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg']
  });

  const createParent = () =>
    BreedParentModel.create({
      id: 'hound',
      subBreeds: [BreedSubModel.create({ id: 'hound-afghan' })]
    });

  it('should populate subChild when fetchImages is called', async () => {
    const parent = createParent();
    const subBreed = parent.subBreeds[0];
    await subBreed.fetchImages();
    expect(subBreed.state).toBe('success');
    expect(subBreed.images.length).toBe(1);
  });

  it('should add images to subBreeds correctly', async () => {
    const parent = createParent();
    const subBreed = parent.subBreeds[0];

    await subBreed.fetchImages();
    expect(parent.subBreeds[0].images.length).toBe(1);

    await parent.fetchImages();
    expect(parent.state).toBe('success');
    expect(parent.subBreeds[0].images.length).toBe(1);
  });

  it('should override images in subBreed when category is fetched', async () => {
    const parent = createParent();
    await parent.fetchImages();

    expect(parent.state).toBe('success');
    expect(parent.subBreeds[0].images.length).toBe(1);
  });
});
