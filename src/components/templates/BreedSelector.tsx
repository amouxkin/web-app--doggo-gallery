import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, HStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import {
  ChildCategoryInstance,
  ParentCategoryInstance,
  SingletonCategoryInstance
} from 'utilities/models';
import { useBreedStore } from 'store';

export const BreedSelector = observer(() => {
  const { categoriesAsOptions } = useBreedStore();

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
          input: (provided) => ({
            ...provided,
            minW: '200px'
          })
        }}
        options={categoriesAsOptions}
        isMulti
        placeholder={'Enter a category name'}
        closeMenuOnSelect={false}
        value={values}
        onChange={(newValue) => {
          if (newValue.length > 5) return;
          setValues((prevState) => {
            prevState.forEach((child) => {
              if (!newValue.includes(child)) child.value.unSelect();
            });
            newValue.forEach((child) => child.value.select());
            return newValue as Array<{
              label: string;
              value: ChildCategoryInstance | SingletonCategoryInstance | ParentCategoryInstance;
            }>;
          });
        }}
      />
      <Button
        onClick={() => {
          values.forEach((value) => {});
        }}
      >
        Search
      </Button>
    </HStack>
  );
});
