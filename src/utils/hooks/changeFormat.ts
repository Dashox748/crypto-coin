export default function changeFormat(
  number: number,
  minDigits: number,
  maxDigits: number
) {
  return new Intl.NumberFormat("de-DE", {
    minimumSignificantDigits: minDigits,
    maximumSignificantDigits: maxDigits,
    maximumFractionDigits: 0,
  }).format(number);
}
