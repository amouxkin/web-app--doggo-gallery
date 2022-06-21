import { observer } from 'mobx-react-lite';
import { Checkbox, Grid, GridItem, VStack } from '@chakra-ui/react';
import { BreedSelector } from 'components/templates';
import { useBreedStore } from 'store';
import { BreedParentModel, BreedParentModelInstance, BreedSingletonModel } from 'utilities/models';
import { BreedWithSubCheckBox } from 'components/molecules';
import { BreedSingleCheckBox } from 'components/atoms';
import { getType } from 'mobx-state-tree';

export const Home = observer(() => {
  const store = useBreedStore();
  console.log(store.filteredBreeds, store.filteredBreeds.length);
  return (
    <Grid
      templateAreas={`
      "nav header"
      "nav gallery"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'150px 1fr'}
      h="200px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="pink.300" area={'nav'}>
        <VStack alignItems={'flex-start'} minW={'12rem'}>
          <Checkbox
            isChecked={store.isAllSelected && store.categories.length > 0}
            onChange={() =>
              !store.isAllSelected ? store.selectAllCategories() : store.unSelectAllCategories()
            }
          >
            All
          </Checkbox>
          {store.filteredBreeds.map((category) => {
            console.log(store.filteredBreeds.map((breed) => breed.id));
            switch (getType(category)) {
              case BreedParentModel:
                return (
                  <BreedWithSubCheckBox
                    filteredMode
                    key={category.name}
                    breed={category as BreedParentModelInstance}
                  />
                );
              case BreedSingletonModel:
                return <BreedSingleCheckBox key={category.name} breed={category} />;
              default:
                return <></>;
            }
          })}
        </VStack>
      </GridItem>
      <GridItem pl="2" area={'header'} justifySelf={'center'}>
        <BreedSelector />
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={'gallery'}>
        Gallery
      </GridItem>
    </Grid>
  );
});
