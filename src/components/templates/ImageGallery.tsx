import { Badge, HStack, Image, Spinner, Stack, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useBreedStore } from 'store';

export const ImageGallery = observer<{ onlyFavourites?: boolean }>(({ onlyFavourites }) => {
  const { interlacedSelectedImages, addToFavorites, removeFromFavorites, favorites } =
    useBreedStore();
  return (
    <Wrap>
      <AnimatePresence presenceAffectsLayout>
        {(onlyFavourites ? Array.from(favorites.values()) : interlacedSelectedImages).map(
          (image) => {
            // TODO: change image from string to model.
            const [breed, subBreed] = image.split('/').slice(4)[0].split('-');
            return (
              <WrapItem
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={image}
              >
                <VStack>
                  <Image
                    boxSize="200px"
                    objectFit="cover"
                    fallback={
                      <Stack
                        h={'200px'}
                        w={'200px'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Spinner />
                      </Stack>
                    }
                    src={image}
                    alt={`image`}
                    onDoubleClick={() => {
                      favorites.has(image.split('/').pop()!)
                        ? removeFromFavorites(image)
                        : addToFavorites(image);
                    }}
                  />
                  <HStack>
                    <Badge colorScheme="green">{breed}</Badge>
                    <Badge colorScheme="purple">{subBreed}</Badge>
                    <Badge colorScheme={'whiteAlpha'}>
                      {favorites.has(image.split('/').pop()!) ? (
                        <StarIcon color={'yellow.500'} />
                      ) : null}
                    </Badge>
                  </HStack>
                </VStack>
              </WrapItem>
            );
          }
        )}
      </AnimatePresence>
    </Wrap>
  );
});
