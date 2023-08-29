export const transformObjectsToJson = (objs: unknown) => {
  return JSON.parse(JSON.stringify(objs))
}
