export default function changeFormat(number: number) {
  return new Intl.NumberFormat("de-DE", {
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 12,
    maximumFractionDigits: 0,
  }).format(number);
}
