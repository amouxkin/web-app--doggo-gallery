import { Wrap } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useBreedStore } from 'store';
import { ImageGalleryItem } from 'components/organisms';

export const ImageGallery = observer<{ onlyFavourites?: boolean }>(({ onlyFavourites }) => {
  const { interlacedSelectedImages, favorites } = useBreedStore();
  return (
    <Wrap>
      <AnimatePresence presenceAffectsLayout>
        {(onlyFavourites ? Array.from(favorites.values()) : interlacedSelectedImages).map(
          (imageUrl) => (
            <ImageGalleryItem image={imageUrl} />
          )
        )}
      </AnimatePresence>
    </Wrap>
  );
});
