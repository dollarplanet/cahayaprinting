export const generateProductSlug = (value: string) => {
  return encodeURI(value.trim().toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, "-")).replace(/-+/g, "-");
}