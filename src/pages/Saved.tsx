import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useBreedStore } from 'store';
import { SelectedImageGallery } from 'components/templates';
import { Center, Text } from '@chakra-ui/react';

export const Saved = observer(() => {
  const { favorites } = useBreedStore();
  if (!Array.from(favorites.values()).length)
    return (
      <Center>
        <Text>No Saved Images</Text>
      </Center>
    );
  return <SelectedImageGallery imageUrls={Array.from(favorites.values())} />;
});
