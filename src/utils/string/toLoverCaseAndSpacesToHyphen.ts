export const toLoverCaseAndSpacesToHyphen = (string: string) => {
  return string ? string.toLowerCase().trim().replace(/\s/g, '-') : ''
}
