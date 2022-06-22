import { FC, useEffect } from 'react';
import { VStack, Wrap } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
  usePagination
} from '@ajna/pagination';
import { getImageId } from 'utilities/helpers';
import { ImageGalleryItem } from 'components/organisms';

export const SelectedImageGallery: FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  const { currentPage, setCurrentPage, pagesCount, pages, offset } = usePagination({
    total: imageUrls.length,
    limits: {
      outer: 2,
      inner: 2
    },
    initialState: { currentPage: 1, pageSize: 12 }
  });

  useEffect(() => {
    /**
     * To handle scenario where if page is 15 and all are cleared i.e. total becomes 0,
     * it will still hold that page number.
     */
    setCurrentPage(1);
  }, [imageUrls.length]);

  return (
    <VStack>
      <Wrap>
        <AnimatePresence presenceAffectsLayout>
          {imageUrls.slice(offset, offset + 12).map((imageUrl) => (
            <ImageGalleryItem key={getImageId(imageUrl)} image={imageUrl} />
          ))}
        </AnimatePresence>
      </Wrap>
      <Pagination pagesCount={pagesCount} currentPage={currentPage} onPageChange={setCurrentPage}>
        <PaginationContainer align="center" justify="space-between" p={4} w="auto">
          <PaginationPrevious mr={10}>Previous</PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="stretch"
            justify={'space-between'}
            separator={<PaginationSeparator w={20} jumpSize={2} />}
          >
            {pages.map((page: number) => (
              <PaginationPage
                key={`pagination_page_${page}`}
                page={page}
                w={20}
                _current={{
                  bg: 'green.300',
                  fontSize: 'sm'
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext ml={10}>Next</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </VStack>
  );
};
