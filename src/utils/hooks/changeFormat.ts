export default function changeFormat(number: number, digits: number) {
  return new Intl.NumberFormat("de-DE", {
    minimumSignificantDigits: 1,
    maximumSignificantDigits: digits,
    maximumFractionDigits: 0,
  }).format(number);
}

// export const changeFormatPercentage = (number: number) => {
//   return new Intl.NumberFormat("de-DE", {
//     minimumSignificantDigits: 1,
//     maximumSignificantDigits: 8,
//     maximumFractionDigits: 0,
//   }).format(number);
// };

// export const changeFormatNumeric = (number: number) => {
//   return new Intl.NumberFormat("de-DE", {
//     minimumSignificantDigits: 1,
//     maximumSignificantDigits: 8,
//     maximumFractionDigits: 0,
//   }).format(number);
// };
