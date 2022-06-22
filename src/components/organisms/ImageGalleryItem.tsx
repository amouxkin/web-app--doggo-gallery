import { observer } from 'mobx-react-lite';
import { getImageId, getImageNames } from 'utilities/helpers';
import { Badge, HStack, Image, Spinner, Stack, Tooltip, VStack, WrapItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { StarIcon } from '@chakra-ui/icons';
import { useBreedStore } from 'store';

export const ImageGalleryItem = observer<{ image: string }>(({ image }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useBreedStore();
  const [breed, subBreed] = getImageNames(image);
  const imageId = getImageId(image);

  return (
    <WrapItem
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={image}
    >
      <VStack>
        <Tooltip placement={'auto'} label="Double click to add/remove from favorites" fontSize="md">
          <Image
            cursor={'pointer'}
            boxSize="200px"
            objectFit="cover"
            fallback={
              <Stack h={'200px'} w={'200px'} justifyContent={'center'} alignItems={'center'}>
                <Spinner />
              </Stack>
            }
            src={image}
            alt={`image`}
            onDoubleClick={() => {
              favorites.has(imageId) ? removeFromFavorites(image) : addToFavorites(image);
            }}
          />
        </Tooltip>
        <HStack>
          <Badge colorScheme="green">{breed}</Badge>
          <Badge colorScheme="purple">{subBreed}</Badge>
          <Badge colorScheme={'whiteAlpha'}>
            {favorites.has(imageId) ? <StarIcon color={'yellow.500'} /> : null}
          </Badge>
        </HStack>
      </VStack>
    </WrapItem>
  );
});
