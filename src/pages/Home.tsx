import { observer } from 'mobx-react-lite';
import { Grid, GridItem } from '@chakra-ui/react';
import { BreedSelector } from 'components/templates';
import { useBreedStore } from 'store';

export const Home = observer(() => {
  const store = useBreedStore();
  return (
    <Grid
      templateAreas={`
      "nav header"
      "nav gallery"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'150px 1fr'}
      h="200px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="pink.300" area={'nav'}></GridItem>
      <GridItem pl="2" area={'header'} justifySelf={'center'}>
        <BreedSelector />
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={'gallery'}>
        Gallery
      </GridItem>
    </Grid>
  );
});
