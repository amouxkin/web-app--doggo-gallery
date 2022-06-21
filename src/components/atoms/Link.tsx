import { FC } from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as WouterLink, LinkProps } from 'wouter';

export const Link: FC<LinkProps> = (props) => <ChakraLink as={WouterLink} {...props} />;
