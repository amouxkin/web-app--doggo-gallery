import { Badge, HStack, Image, Spinner, Stack, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useBreedStore } from 'store';

export const ImageGallery = observer(() => {
  const { interlacedSelectedImages } = useBreedStore();
  return (
    <Wrap>
      <AnimatePresence presenceAffectsLayout>
        {interlacedSelectedImages.map((image) => {
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
                    <Stack h={'200px'} w={'200px'} justifyContent={'center'} alignItems={'center'}>
                      <Spinner />
                    </Stack>
                  }
                  src={image}
                  alt={`image`}
                />
                <HStack>
                  <Badge colorScheme="green">{breed}</Badge>
                  <Badge colorScheme="purple">{subBreed}</Badge>
                </HStack>
              </VStack>
            </WrapItem>
          );
        })}
      </AnimatePresence>
    </Wrap>
  );
});
