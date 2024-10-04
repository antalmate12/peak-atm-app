export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('hu', {
    style: "currency",
    currency: "HUF",
    minimumFractionDigits: 0,
  }).format(price);
};