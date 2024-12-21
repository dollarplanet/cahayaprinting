export const money = (value: number) => {
  if (value === 0) return "GRATIS";

  let reversed = "";
  let holder = "";
  let final = "";
  let index = 1;

  for(const char of value.toString()) {
    reversed = char + reversed;
  }

  for(const char of reversed) {
    holder += (index % 3 === 0) ? (char + ".") : char;
    index += 1;
  }

  for(const char of holder) {
    final = char + final;
  }


  if(final[0] === ".") {
    return "Rp " + final.slice(1, final.length);
  }

  return "Rp " + final;
}