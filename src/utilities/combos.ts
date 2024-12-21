export const combos = (list: any[], n:number = 0, result: any[] = [], current: any[] = []) => {
  if (n === list.length) result.push(current)
  else list[n].forEach((item: any) => combos(list, n+1, result, [...current, item]))

  return result
}