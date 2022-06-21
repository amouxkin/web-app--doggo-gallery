import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, CheckboxProps, Stack } from '@chakra-ui/react';
import { ApiState } from 'utilities/enums';
import { BreedParentModelInstance } from 'utilities/models';
import { BreedSingleCheckBox } from 'components/atoms';
import { useBreedStore } from 'store';

export const BreedWithSubCheckBox = observer<
  CheckboxProps & { breed: BreedParentModelInstance; filteredMode?: boolean }
>(({ breed, filteredMode, ...props }) => {
  const store = useBreedStore();
  useEffect(() => {
    if (breed.allSubBreedSelected && !breed.isSelected) breed.select();
    if (breed.isSelected && !breed.allSubBreedSelected) breed.unSelectJustParent();
  }, [breed.allSubBreedSelected, breed.anySubBreedSelected]);

  useEffect(() => {
    if (breed.isSelected && ![ApiState.fetching, ApiState.success].includes(breed.state))
      breed.fetchImages();
  }, [breed.isSelected]);

  return (
    <>
      <Checkbox
        isChecked={breed.isSelected}
        isIndeterminate={breed.anySubBreedSelected && !breed.isSelected}
        onChange={() => (breed.isSelected ? breed.unSelect() : breed.select())}
        {...props}
      >
        {breed.name}
      </Checkbox>
      <Stack pl={6}>
        {breed.subBreeds
          .filter((subBreed) => {
            console.log(subBreed);
            return filteredMode ? store.filtered.includes(subBreed) || breed.isFiltered : true;
          })
          .map((subBreed) => (
            <BreedSingleCheckBox key={subBreed.name} breed={subBreed} />
          ))}
      </Stack>
    </>
  );
});
