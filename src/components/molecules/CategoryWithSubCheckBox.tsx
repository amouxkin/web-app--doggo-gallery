import { observer } from 'mobx-react-lite';
import { ParentCategoryInstance } from 'utilities/models';
import { Checkbox, Stack } from '@chakra-ui/react';
import { CategorySingleCheckBox } from 'components/atoms/CategorySingleCheckBox';

export const CategoryWithSubCheckBox = observer<{ category: ParentCategoryInstance }>(
  ({ category }) => {
    return (
      <Stack>
        <Checkbox
          key={category.id}
          isChecked={category.isSelected || category.allChildrenSelected}
          onChange={() => {
            if (category.isSelected) {
              category.unSelect();
              category.unSelectChildren();
            } else {
              category.select();
              category.selectChildren();
              if (!category.childrenArray.every((child) => child.images.size))
                category.fetchImages();
            }
          }}
        >
          {category.name}
        </Checkbox>
        <Stack pl={4}>
          {category.childrenArray.map((child) => (
            <CategorySingleCheckBox key={child.id} category={child} />
          ))}
        </Stack>
      </Stack>
    );
  }
);
