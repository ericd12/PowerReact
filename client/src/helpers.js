export const isArrayEmpty = arrayArg => {
  if (arrayArg && arrayArg.length) {
    return false;
  }
  return true;
};

export const createEnum = val =>
  val.reduce((all, one) => {
    return {
      ...all,
      [one._id]: one,
    };
  }, {});
