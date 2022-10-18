export function getValueByPath(obj, path) {
  let paths = path.split('.');
  let res = obj;
  let prop;
  while ((prop = paths.shift())) {
    res = res[prop];
  }
  return res;
}
