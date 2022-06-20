import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge, HStack, Image, Spinner, Stack, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { BreedParentModelInstance } from 'utilities/models';
import { useBreedStore } from 'store';
import { BreedSingleCheckBox } from 'components/atoms';
import { BreedWithSubCheckBox } from 'components/molecules';

export const Home: FC = observer(() => {
  const { categories, images } = useBreedStore();
  return (
    <HStack alignItems={'flex-start'}>
      <VStack alignItems={'flex-start'}>
        {categories.map((category) =>
          (category as BreedParentModelInstance)?.subBreeds ? (
            <BreedWithSubCheckBox
              key={category.name}
              breed={category as BreedParentModelInstance}
            />
          ) : (
            <BreedSingleCheckBox key={category.name} breed={category} />
          )
        )}
      </VStack>
      <Wrap>
        <AnimatePresence>
          {images.map((image) => {
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
    </HStack>
  );
});
