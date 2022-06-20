import { getParent, types } from 'mobx-state-tree';
import { BreedBaseModel, BreedBaseModelInstance } from './breed--base.model';

export const BreedSubModel = types
  .compose(
    types.model({
      images: types.array(types.string)
    }),
    BreedBaseModel
  )
  .named('BreedSubModel')
  .views((self) => ({
    get name() {
      return self.id.split('-')[1];
    },
    get parent() {
      return getParent<BreedBaseModelInstance>(self);
    }
  }))
  .views((self) => ({
    get url() {
      return `/breed/${self.parent.name}/${self.name}/images`;
    }
  }))
  .actions((self) => ({
    clear: () => {
      self.images.clear();
    },
    pushImage: (imageUrls: string) => {
      self.images.push(imageUrls);
    }
  }));
