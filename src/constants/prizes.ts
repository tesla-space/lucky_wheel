export const PRIZES = [
  { label: "СПЕЦИАЛЬНОЕ МЕСТО", color: "#D50000" }, // đỏ đậm
  { label: "ПЕРВОЕ МЕСТО", color: "#FFC107" }, // vàng đậm hơn
  { label: "ВТОРОЕ МЕСТО", color: "#1976D2" }, // xanh đậm (rất quan trọng)
  { label: "ТРЕТЬЕ МЕСТО", color: "#2E7D32" }, // xanh lá đậm
  { label: "ПООЩРИТЕЛЬНЫЙ ПРИЗ", color: "#F57C00" }, // cam đậm
];

export type PrizeItem = {
  label: string;
  color: string;
};

// Giải đặc biệt → СПЕЦИАЛЬНОЕ МЕСТО
// Giải nhất → ПЕРВОЕ МЕСТО
// Giải nhì → ВТОРОЕ МЕСТО
// Giải ba → ТРЕТЬЕ МЕСТО
// Giải khuyến khích → ПООЩРИТЕЛЬНЫЙ ПРИЗ
