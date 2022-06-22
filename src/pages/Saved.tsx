import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useBreedStore } from 'store';
import { SelectedImageGallery } from 'components/templates';

export const Saved = observer(() => {
  const { favorites } = useBreedStore();
  return  <SelectedImageGallery imageUrls={Array.from(favorites.values())} />
});
