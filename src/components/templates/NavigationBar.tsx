import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { Link } from 'components/atoms';

export const NavigationBar: FC = () => (
    <HStack gap={2} as={'nav'}>
      <Link to={'/home'}> Home </Link>
      <Link to={'/selector'}> Selector </Link>
      <Link to={'/saved'}> Saved Images </Link>
    </HStack>
  );
