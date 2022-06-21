import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, HStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import {
  ChildCategoryInstance,
  isParentCategory,
  ParentCategoryInstance,
  SingletonCategoryInstance
} from 'utilities/models';
import { useBreedStore } from 'store';

export const BreedSelector = observer(() => {
  const {
    categoriesAsOptions,
    fetchSelectedImages,
    categories,
    setSelectedCategories,
    selectedCategories
  } = useBreedStore();

  const [values, setValues] = useState<
    Array<{
      label: string;
      value: ChildCategoryInstance | SingletonCategoryInstance | ParentCategoryInstance;
    }>
  >(selectedCategories.map((category) => ({ label: category.id, value: category })));

  return (
    <HStack>
      <Select
        size="md"
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            minW: '32rem',
            maxW: '32rem'
          })
        }}
        options={categoriesAsOptions}
        isMulti
        placeholder={'Enter a category name'}
        closeMenuOnSelect={false}
        value={values}
        onChange={(newValue) => {
          if (newValue.length > 5) return;
          setValues(
            newValue as Array<{
              label: string;
              value: ChildCategoryInstance | SingletonCategoryInstance | ParentCategoryInstance;
            }>
          );
        }}
      />
      <Button
        onClick={() => {
          const rawValues = values.map((value) => value.value);
          categories.forEach((category) => {
            rawValues.includes(category) ? category.select() : category.unSelect();

            if (isParentCategory(category)) {
              category.children.forEach((child) => {
                rawValues.includes(child) || rawValues.includes(category)
                  ? child.select()
                  : child.unSelect();
              });
            }
          });

          setSelectedCategories(rawValues);
          fetchSelectedImages();
        }}
      >
        Search
      </Button>
    </HStack>
  );
});
