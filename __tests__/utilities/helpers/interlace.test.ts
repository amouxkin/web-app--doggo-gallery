import { interlace } from 'utilities/helpers';

describe('#interlace', () => {
  it('should interlace two arrays', () => {
    expect(interlace(['red', 'red', 'red'], ['blue', 'blue'], ['green'])).toStrictEqual([
      'red',
      'blue',
      'green',
      'red',
      'blue',
      'red'
    ]);
  });
});
