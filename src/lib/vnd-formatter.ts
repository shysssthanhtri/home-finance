const vnd = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const vndFormatter = (number: number) => vnd.format(number);
