import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { VStack } from '@chakra-ui/react';
import { BreedParentModelInstance } from 'utilities/models';
import { useBreedStore } from 'store';
import { BreedSingleCheckBox } from 'components/atoms';
import { BreedWithSubCheckBox } from 'components/molecules';



export const Home: FC = observer(() => {
  const { categories } = useBreedStore();
  return (
    <VStack alignItems={'start'}>
      {categories.map((category) =>
        (category as BreedParentModelInstance)?.subBreeds ? (
          <BreedWithSubCheckBox key={category.name} breed={category as BreedParentModelInstance} />
        ) : (
          <BreedSingleCheckBox key={category.name} breed={category} />
        )
      )}
    </VStack>
  );
});
