import { observer } from 'mobx-react-lite';
import { Select } from 'chakra-react-select';
import {
  BreedParentModelInstance,
  BreedSingletonModelInstance,
  BreedSubModelInstance
} from 'utilities/models';
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
    Array<BreedParentModelInstance | BreedSubModelInstance | BreedSingletonModelInstance>
  >([]);

  return (
    <HStack>
    </HStack>
  );
});
