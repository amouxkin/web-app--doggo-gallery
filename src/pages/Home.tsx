import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { HStack, VStack } from '@chakra-ui/react';
import { BreedParentModelInstance } from 'utilities/models';
import { useBreedStore } from 'store';
import { BreedSingleCheckBox } from 'components/atoms';
import { BreedWithSubCheckBox } from 'components/molecules';
import { BreedSelector, ImageGallery } from 'components/templates';

export const Home: FC = observer(() => {
  const { categories } = useBreedStore();
  return (
    <HStack alignItems={'flex-start'}>
      <VStack alignItems={'flex-start'} minW={'12rem'}>
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
      <VStack w={'full'}>
        <HStack w={'full'}>
          <BreedSelector />
        </HStack>
        <ImageGallery />
      </VStack>
    </HStack>
  );
});
