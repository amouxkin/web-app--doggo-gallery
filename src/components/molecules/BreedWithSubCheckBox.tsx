import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, CheckboxProps, Stack } from '@chakra-ui/react';
import { BreedParentModelInstance } from 'utilities/models';
import { BreedSingleCheckBox } from 'components/atoms';

export const BreedWithSubCheckBox = observer<CheckboxProps & { breed: BreedParentModelInstance }>(
  ({ breed, ...props }) => {
    useEffect(() => {
      if (breed.allSubBreedSelected && !breed.isSelected) breed.select();
      if (breed.isSelected && !breed.allSubBreedSelected) breed.unSelectJustParent();
    }, [breed.allSubBreedSelected, breed.anySubBreedSelected]);

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
          {breed.subBreeds.map((subBreed) => (
            <BreedSingleCheckBox key={subBreed.name} breed={subBreed} />
          ))}
        </Stack>
      </>
    );
  }
);
