export const PRIZES: PrizeItem[] = [
  { label: "СПЕЦИАЛЬНОЕ МЕСТО", color: "#FF0000" },
  { label: "ПЕРВОЕ МЕСТО", color: "#FFD700" },
  { label: "ВТОРОЕ МЕСТО", color: "#4DA6FF" },
  { label: "ТРЕТЬЕ МЕСТО", color: "#4CAF50" },
  { label: "ПООЩРИТЕЛЬНЫЙ ПРИЗ", color: "#FF9800" },
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
