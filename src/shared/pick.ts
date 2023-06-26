const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const finalObject: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      let prevPriceObj = {};
      if (key === 'minPrice' || key === 'maxPrice') {
        prevPriceObj = { ...(finalObject?.price || {}) };
      }
      if (key === 'minPrice') {
        (finalObject as Record<string, unknown>)['price'] = {
          ...prevPriceObj,
          $gte: obj[key],
        };
      } else if (key === 'maxPrice') {
        (finalObject as Record<string, unknown>)['price'] = {
          ...prevPriceObj,
          $lte: obj[key],
        };
      } else {
        finalObject[key] = obj[key];
      }
    }
  }

  return finalObject;
};

export default pick;
