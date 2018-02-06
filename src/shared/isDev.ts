export const isDev = (): boolean => {
  if (process.defaultApp === true) {
    return true
  } else {
    return false
  }
}