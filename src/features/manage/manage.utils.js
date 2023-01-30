export const filterRows = (data, column, value) => {
  const filteredRows = data.filter((user) => user[column].startsWith(value));

  return filteredRows;
};
