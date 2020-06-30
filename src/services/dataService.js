const rowIndexRegexp = /\[([^\]\[\r\n]*)\]/;

export const updateData = (object, key, value) => {
  if (key.includes('.')) {
    const keyPath = key.split('.');

    if (keyPath.length > 2) {
      throw new Error('Invalid data key.');
    }

    const [firstLevelKey, secondLevelKey] = keyPath;

    if (rowIndexRegexp.test(firstLevelKey)) {
      const firstLevelRowIndex = firstLevelKey.match(rowIndexRegexp)[1];
      const firstLevelRowKey = firstLevelKey.replace(`[${firstLevelRowIndex}]`, '');

      const firstLevelArray = [...object[firstLevelRowKey]];
      firstLevelArray[firstLevelRowIndex][secondLevelKey] = value;

      return {
        ...object,
        [firstLevelRowKey]: firstLevelArray,
      };
    }

    return {
      ...object,
      [firstLevelKey]: {
        ...object[firstLevelKey],
        [secondLevelKey]: value,
      },
    };
  }

  if (rowIndexRegexp.test(key)) {
    const firstLevelRowIndex = key.match(rowIndexRegexp)[1];
    const firstLevelRowKey = key.replace(`[${firstLevelRowIndex}]`, '');

    const firstLevelArray = [...object[firstLevelRowKey]];
    firstLevelArray[firstLevelRowIndex] = value;

    return {
      ...object,
      [firstLevelRowKey]: firstLevelArray,
    };
  }

  return {
    ...object,
    [key]: value,
  };
};
