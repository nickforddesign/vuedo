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

module.exports.requireParams = (obj) => {
  const missingParams = Object.keys(obj).filter((key) => !obj[key]);
  if (missingParams.length) {
    throw new Error(`Missing params: ${missingParams}`);
  }
};
