export interface APIStatus {
  status: 'success';
}

/**
 * Returns breeds with sub-breeds if they exist as an array of strings.
 */
export interface BreedsResponse extends APIStatus {
  message: Record<string, string[]>;
}

export interface ImagesResponse extends APIStatus {
  message: string[];
}
