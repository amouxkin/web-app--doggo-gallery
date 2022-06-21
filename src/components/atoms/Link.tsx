import { FC } from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as WouterLink, LinkProps, useRoute } from 'wouter';

export const Link: FC<LinkProps> = (props) => {
  const [match] = useRoute(props.to || '#');
  return (
    <ChakraLink
      as={WouterLink}
      fontFamily={'body'}
      fontWeight={'medium'}
      textDecoration={'none'}
      transition={{
        shortEaseOut: 'all .25s ease-out'
      }}
      color={match ? 'gray.600' : 'gray.400'}
      _active={{
        textDecoration: 'none'
      }}
      _focus={{
        boxShadow: 'none'
      }}
      _hover={{
        textDecoration: 'none',
        color: 'gray.900'
      }}
      _visited={{
        textDecoration: 'none'
      }}
      {...props}
    />
  );
};
