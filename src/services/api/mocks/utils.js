module.exports.getCurrentMaxId = (mockDbTable) => {
  try {
    const { id } = mockDbTable.reduce((acc, entry) => {
      return entry.id > acc.id ? entry : acc;
    });
    return id;
  } catch (error) {
    return -1;
  }
};
