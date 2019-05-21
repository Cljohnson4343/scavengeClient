export function inError(errObj) {
  for (let key in errObj) {
    if (errObj[key].inError) {
      return true;
    }
  }
  return false;
}

export function msg(errObj) {
  for (let key in errObj) {
    if (errObj[key].inError) {
      return errObj[key].msg;
    }
  }
  return null;
}
