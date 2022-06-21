import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { HStack, VStack } from '@chakra-ui/react';
import { BreedParentModelInstance, BreedSingletonModelInstance } from 'utilities/models';
import { useBreedStore } from 'store';
import { BreedSingleCheckBox } from 'components/atoms';
import { BreedWithSubCheckBox } from 'components/molecules';
import { Select } from 'chakra-react-select';
import { ImageGallery } from 'components/templates';

export const Home: FC = observer(() => {
  const { categories } = useBreedStore();
  return (
    <HStack alignItems={'flex-start'}>
      <VStack alignItems={'flex-start'}>
        {categories.map((category) =>
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
        </HStack>
        <ImageGallery />
      </VStack>
    </HStack>
  );
});
