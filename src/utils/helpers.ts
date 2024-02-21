export const cleanUrl = (url: string): string =>
  url.replace(/([^:])(\/\/+)/g, '$1/')
