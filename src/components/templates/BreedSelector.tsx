import { observer } from 'mobx-react-lite';
import { Select } from 'chakra-react-select';
import { BreedParentModelInstance, BreedSingletonModelInstance } from 'utilities/models';
import { useBreedStore } from 'store';

export const BreedSelector = observer(() => {
  const { categories } = useBreedStore();
  return (
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
      }, [] as Array<{ label: string; value: BreedParentModelInstance | BreedSingletonModelInstance }>)}
      isMulti
      placeholder={'Enter a breed name'}
      closeMenuOnSelect={false}
    />
  );
});
