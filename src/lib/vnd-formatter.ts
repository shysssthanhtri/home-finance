const vndFormat = new Intl.NumberFormat("vi-VN", {
  currency: "VND",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
});

export const vndFormatter = (number: number) => vndFormat.format(number);
