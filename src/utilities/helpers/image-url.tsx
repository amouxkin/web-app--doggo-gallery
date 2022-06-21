export const getImageId = (imageUrl: string) => imageUrl.split('/').pop()!;

export const getImageNames = (imageUrl: string) => imageUrl.split('/').slice(4)[0].split('-');
