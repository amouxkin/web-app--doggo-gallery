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
  const { categoriesAsOptions, fetchSelectedImages, categories } = useBreedStore();

  const [values, setValues] = useState<
    Array<{
      label: string;
      value: ChildCategoryInstance | SingletonCategoryInstance | ParentCategoryInstance;
    }>
  >([]);

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
            //   prevState.forEach((child) => {
            //     if (!newValue.includes(child)) child.value.unSelect();
            //   });
            //   newValue.forEach((child) => child.value.select());
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
          fetchSelectedImages();
        }}
      >
        Search
      </Button>
    </HStack>
  );
});
