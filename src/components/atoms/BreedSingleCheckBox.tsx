import { observer } from 'mobx-react-lite';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  BreedParentModelInstance,
  BreedSingletonModelInstance,
  BreedSubModel,
  BreedSubModelInstance
} from 'utilities/models';
import { getType } from 'mobx-state-tree';

export interface BreedSingleCheckBoxProps extends CheckboxProps {
  breed: BreedSingletonModelInstance | BreedSubModelInstance;
}

export const BreedSingleCheckBox = observer<BreedSingleCheckBoxProps>(({ breed, ...props }) => {
  useEffect(() => {
    if (
      getType(breed) === BreedSubModel &&
      ((breed as BreedSubModelInstance).parent.isSelected ||
        ((breed as BreedSubModelInstance).parent as BreedParentModelInstance).allSubBreedSelected)
    ) {
      return;
    }

    if (breed.isSelected && !['fetching', 'success'].includes(breed.state)) breed.fetchImages();
  }, [breed.isSelected]);

  return (
    <Checkbox
      isChecked={breed.isSelected}
      onChange={() => (breed.isSelected ? breed.unSelect() : breed.select())}
      {...props}
    >
      {breed.name}
    </Checkbox>
  );
});
