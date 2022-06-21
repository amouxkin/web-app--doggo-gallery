import { observer } from 'mobx-react-lite';
import { Select } from 'chakra-react-select';
import {
  BreedParentModelInstance,
  BreedSingletonModelInstance,
  BreedSubModelInstance
} from 'utilities/models';
import { FilteredBreedInstance, useBreedStore } from 'store';
import { useState } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { cast, castToReferenceSnapshot } from 'mobx-state-tree';

export type BreedSelectorValues = {
  label: string;
  value: BreedParentModelInstance | BreedSingletonModelInstance;
};

export const BreedSelector = observer(() => {
  const { categories } = useBreedStore();

  const [values, setValues] = useState<
    Array<BreedParentModelInstance | BreedSubModelInstance | BreedSingletonModelInstance>
  >([]);

  return (
    <HStack>
      <Select
        size="md"
        chakraStyles={{
          input: (provided, state) => ({
            ...provided,
            minW: '200px'
          })
        }}
        options={categories.reduce((options, category) => {
          options.push({
            label: category.name,
            value: category
          });

          (category as BreedParentModelInstance)?.subBreeds?.forEach((subBreed) =>
            options.push({
              label: `${category.name}-${subBreed.name}`,
              value: subBreed
            })
          );

          return options;
        }, [] as BreedSelectorValues[])}
        isMulti
        placeholder={'Enter a category name'}
        closeMenuOnSelect={false}
        onChange={(newValue) => setValues(newValue.map((newValue) => newValue.value))}
      />
      <Button
        onClick={() => {
          values.forEach((value) => {
            console.log(value);
            value.filter();
          });
        }}
      >
        Search
      </Button>
    </HStack>
  );
});
