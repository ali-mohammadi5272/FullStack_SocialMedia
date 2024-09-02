const checkDBCollectionIndexes = async (model) => {
  try {
    await model.listIndexes();
  } catch (err) {
    await model.createIndexes();
  }
};

module.exports = { checkDBCollectionIndexes };
