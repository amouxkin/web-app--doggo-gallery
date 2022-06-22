import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AnimatePresence } from 'framer-motion';
import { Spinner, Wrap } from '@chakra-ui/react';
import { ImageGalleryItem } from 'components/organisms';
import { getImageId } from 'utilities/helpers';
import { useRandomImage } from 'store';

export const RandomImages: FC = observer(() => {
  const { images, fetchImages, fetchSucceeded } = useRandomImage();

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <AnimatePresence presenceAffectsLayout>
      <Wrap maxW={'80rem'}>
        {fetchSucceeded ? (
          images.map((imageUrl) => <ImageGalleryItem key={getImageId(imageUrl)} image={imageUrl} />)
        ) : (
          <Spinner />
        )}
      </Wrap>
    </AnimatePresence>
  );
});
