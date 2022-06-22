import { observer } from 'mobx-react-lite';
import { ChildCategoryInstance, SingletonCategoryInstance } from 'utilities/models';
import { Checkbox } from '@chakra-ui/react';

export const CategorySingleCheckBox = observer<{
  category: SingletonCategoryInstance | ChildCategoryInstance;
}>(({ category }) => {
  return (
    <Checkbox
      key={category.id}
      isChecked={category.isSelected}
      onChange={() => {
        if (category.isSelected) category.unSelect();
        else {
          category.select();
          if (!category.images.size) category.fetchImages();
        }
      }}
    >
      {category.name}
    </Checkbox>
  );
});
