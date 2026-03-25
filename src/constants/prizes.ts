export const PRIZES = [
  { label: "СУПЕРПРИЗ", color: "#FF4D6D" }, // đỏ noen
  { label: "ПЕРВОЕ МЕСТО", color: "#FFD600" }, // vàng sáng neon
  { label: "ВТОРОЕ МЕСТО", color: "#00B0FF" }, // xanh sáng
  { label: "ТРЕТЬЕ МЕСТО", color: "#00E676" }, // xanh lá sáng
  { label: "ПООЩРИТЕЛЬНЫЙ ПРИЗ", color: "#FF9100" }, // cam sáng
];

export type PrizeItem = {
  label: string;
  color: string;
};

// Giải đặc biệt → СУПЕРПРИЗ
// Giải nhất → ПЕРВОЕ МЕСТО
// Giải nhì → ВТОРОЕ МЕСТО
// Giải ba → ТРЕТЬЕ МЕСТО
// Giải khuyến khích → ПООЩРИТЕЛЬНЫЙ ПРИЗ
