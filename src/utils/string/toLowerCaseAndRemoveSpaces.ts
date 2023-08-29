export const toLowerCaseAndRemoveSpaces = (string: string) => {
  return string ? string.toLowerCase().trim().replace(/\s/g, '') : ''
}
