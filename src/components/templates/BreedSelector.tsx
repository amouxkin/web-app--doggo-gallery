import { observer } from 'mobx-react-lite';
import { Select } from 'chakra-react-select';
import { BreedParentModelInstance, BreedSingletonModelInstance } from 'utilities/models';
import { useBreedStore } from 'store';
import { useState } from 'react';
import { Button, HStack } from '@chakra-ui/react';

export type BreedSelectorValues = {
  label: string;
  value: BreedParentModelInstance | BreedSingletonModelInstance;
};

export const BreedSelector = observer(() => {
  const { categories } = useBreedStore();

  const [values, setValues] = useState<
    Array<BreedParentModelInstance | BreedSingletonModelInstance>
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
              value: category
            })
          );

          return options;
        }, [] as BreedSelectorValues[])}
        isMulti
        placeholder={'Enter a breed name'}
        closeMenuOnSelect={false}
        onChange={(newValue) => setValues(newValue.map((newValue) => newValue.value))}
      />
      <Button
        onClick={() => {
          categories.forEach((category) => {
            values.includes(category)
              ? category.select()
              : category.isSelected && category.unSelect();
          });
        }}
      >
        Search
      </Button>
    </HStack>
  );
});
