import { observer } from 'mobx-react-lite';
import { Checkbox, Grid, GridItem, Stack } from '@chakra-ui/react';
import { BreedSelector, SelectedImageGallery } from 'components/templates';
import { useBreedStore } from 'store';
import {
  isChildCategory,
  isParentCategory,
  isSingletonCategory,
  ParentCategoryInstance,
  SingletonCategoryInstance
} from 'utilities/models';
import { useMemo } from 'react';

export const Home = observer(() => {
  const { selectedCategories, interlacedSelectedImages, isAllSelected, selectedCategoriesKey } =
    useBreedStore();
  const treeNodes = useMemo(() => {
    const arrayElements = new Set<SingletonCategoryInstance | ParentCategoryInstance>();
    selectedCategories.forEach((category) => {
      if (isChildCategory(category)) arrayElements.add(category.parent as ParentCategoryInstance);
      arrayElements.add(category);
    });

    return Array.from(arrayElements.values());
  }, [selectedCategoriesKey]);

  return (
    <Grid
      templateAreas={`
      "nav selector"
      "nav selector"
      "nav gallery"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'150px 1fr'}
      h="200px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem key={'nav'} pl="2" pt="12" area={'nav'}>
        {!!treeNodes.length && (
          <Checkbox
            isChecked={isAllSelected}
            onChange={() => {
              isAllSelected
                ? treeNodes.forEach((node) => {
                    node.unSelect();
                  })
                : treeNodes.forEach((node) => {
                    node.select();
                  });
            }}
          >
            all
          </Checkbox>
        )}

        {treeNodes.map((category) =>
          isParentCategory(category) ? (
            <Stack key={category.id}>
              <Checkbox
                isChecked={category.isSelected || category.allChildrenSelected}
                isIndeterminate={category.isIndeterminate}
                onChange={() => {
                  if (category.isSelected) {
                    category.unSelect();
                    category.unSelectChildren();
                  } else {
                    category.select();
                    category.selectChildren();
                  }
                }}
              >
                {category.name}
              </Checkbox>
              <Stack key={`${category.id}--sub`} pl={6}>
                {category.childrenArray
                  .filter(
                    (child) =>
                      selectedCategories.includes(child) || selectedCategories.includes(category)
                  )
                  .map((child) => (
                    <Checkbox
                      key={child.id}
                      isChecked={child.isSelected}
                      onChange={() => {
                        if (child.isSelected) {
                          child.unSelect();
                          category.unSelect();
                        } else child.select();
                      }}
                    >
                      {child.name}
                    </Checkbox>
                  ))}
              </Stack>
            </Stack>
          ) : (
            isSingletonCategory(category) && (
              <Checkbox
                key={category.id}
                isChecked={category.isSelected}
                onChange={() => {
                  category.isSelected ? category.unSelect() : category.select();
                }}
              >
                {category.name}
              </Checkbox>
            )
          )
        )}
      </GridItem>
      <GridItem key={'selector'} pl="2" area={'selector'} justifySelf={'center'}>
        <BreedSelector />
      </GridItem>
      <GridItem key={'gallery'} pl="2" area={'gallery'}>
        <SelectedImageGallery imageUrls={interlacedSelectedImages} />
      </GridItem>
    </Grid>
  );
});
