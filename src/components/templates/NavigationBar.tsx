import { FC } from 'react';
import { Heading, HStack, Image } from '@chakra-ui/react';
import { Link } from 'components/atoms';
import doggoImage from '../../ions/images/doggo.jpg';

export const NavigationBar: FC = () => (
  <HStack gap={2} as={'nav'} alignItems={'center'} justifyContent={'space-between'} px={20}>
    <Image src={doggoImage} w={40} />
    <Heading>Doggo Gallery</Heading>
    <HStack>
      <Link to={'/'}> Home </Link>
      <Link to={'/selector'}> Selector </Link>
      <Link to={'/saved'}> Saved Images </Link>
    </HStack>
  </HStack>
);
