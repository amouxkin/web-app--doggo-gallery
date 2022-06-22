import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Heading, HStack, VStack, Text } from '@chakra-ui/react';
import { isParentCategory } from 'utilities/models';
import { useBreedStore } from 'store';
import { CategorySingleCheckBox } from 'components/atoms';
import { CategoryWithSubCheckBox } from 'components/molecules';
import { SelectedImageGallery } from 'components/templates';

export const Selector: FC = observer(() => {
  const { categories, interlacedSelectedImages } = useBreedStore();
  return (
    <HStack alignItems={'flex-start'}>
      <VStack alignItems={'flex-start'} minW={'12rem'}>
        {Array.from(categories.values()).map((category) =>
          isParentCategory(category) ? (
            <CategoryWithSubCheckBox key={category.name} category={category} />
          ) : (
            <CategorySingleCheckBox key={category.name} category={category} />
          )
        )}
      </VStack>
      <VStack w={'full'}>
        <Heading as={'h4'}>Dynamic Singleton Loader</Heading>
        <Text>Click on a Category and it will load them in isolation (but smart enough to do it breed wise when needed)</Text>
        <SelectedImageGallery imageUrls={interlacedSelectedImages} />
      </VStack>
    </HStack>
  );
});
