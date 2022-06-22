import { flow, Instance, types } from 'mobx-state-tree';
import { ApiStateModel } from 'utilities/models';
import { baseRouter } from 'utilities/router';
import { ImagesResponse } from 'utilities/types';
import { createContext, FC, ProviderProps, useRef } from 'react';

export const RandomImageStore = types
  .compose(
    types.model({
      images: types.array(types.string)
    }),
    ApiStateModel
  )
  .actions((self) => ({
    fetchImages: flow(function* () {
      self.setFetching();

      try {
        const { message }: ImagesResponse = yield baseRouter
          .url(' /breeds/image/random/12')
          .get()
          .json();

        self.images.clear();
        self.images.push(...message);

        self.setSuccess();
      } catch (e) {
        self.setFailed();
      }
    })
  }));

export interface RandomImageStoreInstance extends Instance<typeof RandomImageStore> {}

export const RandomImageContext = createContext<RandomImageStoreInstance>(null!);

export const RandomImageProvider: FC<Omit<ProviderProps<RandomImageStoreInstance>, 'value'>> = (
  props
) => {
  const store = useRef(RandomImageStore.create());

  return <RandomImageContext.Provider value={store.current} {...props} />;
};
