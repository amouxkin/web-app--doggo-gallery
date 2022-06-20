import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './App';
import { BreedStoreProvider } from 'store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BreedStoreProvider>
        <App />
      </BreedStoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);
