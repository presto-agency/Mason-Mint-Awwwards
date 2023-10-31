export const getFileNameFromCloudUrl = (url = '') => {
  if (url !== '') {
    const urlArray = url.split('/')
    return urlArray[urlArray.length - 1]
  }
}
