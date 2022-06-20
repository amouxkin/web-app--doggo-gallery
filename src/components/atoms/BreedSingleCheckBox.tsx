import { useEffect } from "react";
import { getType } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { Checkbox, CheckboxProps } from "@chakra-ui/react";
import { ApiState } from "utilities/enums";
import { BreedParentModelInstance, BreedSubModel, BreedSubModelInstance } from "utilities/models";

export interface BreedSingleCheckBoxProps extends CheckboxProps {
  breed: {
    state: ApiState;
    isSelected: boolean;
    name: string;
    unSelect: () => void;
    select: () => void;
    fetchImages: () => void;
  };
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

    if (breed.isSelected && ![ApiState.fetching, ApiState.success].includes(breed.state)) breed.fetchImages();
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
