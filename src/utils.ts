function deepClone<Clone>(data: Clone): Clone {
  return JSON.parse(JSON.stringify(data));
}

export { deepClone };
