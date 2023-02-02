const useDataSort = (dataChunk, sortKey) => {
  let processedData;

  if (dataChunk) {
    const rawData = [...dataChunk];
    // if (sortKey.length > 0)
    processedData = rawData.filter(
      (product) =>
        product.name.toLowerCase().includes(sortKey) ||
        product.category?.name.toLowerCase().includes(sortKey)
    );
  }

  return [processedData];
};

export default useDataSort;
