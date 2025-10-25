export const formatString = (
  string: string,
  variables: string[],
) => {
  let index = 0;
  return string.replace(/%s/g, () => {
    return variables[index++] || '';
  });
};
