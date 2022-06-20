export const interlace = <T>(...subjects: Array<Array<T>>) => {
  const longest = subjects.reduce((longest, subject) => {
    if (subject.length > longest) return subject.length;
    return longest;
  }, 0);
  const result: T[] = [];

  for (let index = 0; index < longest; index++) {
    subjects.forEach((subject) => {
      if (!!subject.at(index)) result.push(subject[index]);
    });
  }

  return result;
};
