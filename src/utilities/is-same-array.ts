export const isSameArray = (ones: any[], twos: any[]) => {
  return (ones.length === twos.length) && ones.every(v => twos.includes(v))
};