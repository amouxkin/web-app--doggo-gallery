import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, HStack, VStack } from '@chakra-ui/react';
import { BreedParentModelInstance } from 'utilities/models';
import { useBreedStore } from 'store';
import { BreedSingleCheckBox } from 'components/atoms';
import { BreedWithSubCheckBox } from 'components/molecules';
import { BreedSelector, SelectedImageGallery } from 'components/templates';

export const Selector: FC = observer(() => {
  const store = useBreedStore();
  return (
    <HStack alignItems={'flex-start'}>
      <VStack alignItems={'flex-start'} minW={'12rem'}>
        <Checkbox
          isChecked={store.isAllSelected && store.categories.length > 0}
          onChange={() =>
            !store.isAllSelected ? store.selectAllCategories() : store.unSelectAllCategories()
          }
        >
          All
        </Checkbox>
        {store.categories.map((category) =>
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
        <SelectedImageGallery />
      </VStack>
    </HStack>
  );
});
