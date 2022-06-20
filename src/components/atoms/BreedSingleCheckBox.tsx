import { observer } from 'mobx-react-lite';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';

export interface BreedSingleCheckBoxProps extends CheckboxProps {
  breed: { isSelected: boolean; select: () => void; unSelect: () => void; name: string };
}

export const BreedSingleCheckBox = observer<BreedSingleCheckBoxProps>(({ breed, ...props }) => {
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
