import { useRef } from "react";
import { PRIZES } from "../constants/prizes";

// export type PrizeType = "GIẢI NHẤT" | "GIẢI NHÌ" | "GIẢI BA" | "KHUYẾN KHÍCH";

export type PrizeType = (typeof PRIZES)[number]["label"];
/* cấu hình số lượng giải */
const PRIZE_CONFIG: Record<PrizeType, number> = {
  "СПЕЦИАЛЬНОЕ МЕСТО": 1,
  "ПЕРВОЕ МЕСТО": 1,
  "ВТОРОЕ МЕСТО": 2,
  "ТРЕТЬЕ МЕСТО": 3,
  "ПООЩРИТЕЛЬНЫЙ ПРИЗ": 10,
};

/* shuffle Fisher–Yates */
function shuffle<T>(array: T[]) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export default function useLuckyWheel() {
  const numberPool = useRef<number[] | null>(null);
  const prizePool = useRef<PrizeType[] | null>(null);

  /* khởi tạo pool số (1 → 130) */
  if (!numberPool.current) {
    const nums = Array.from({ length: 81 }, (_, i) => i + 1);

    numberPool.current = shuffle(nums);
  }

  if (!prizePool.current) {
    const khuyenKhich = Array(PRIZE_CONFIG["ПООЩРИТЕЛЬНЫЙ ПРИЗ"]).fill(
      "ПООЩРИТЕЛЬНЫЙ ПРИЗ",
    );
    const giaiBa = Array(PRIZE_CONFIG["ТРЕТЬЕ МЕСТО"]).fill("ТРЕТЬЕ МЕСТО");
    const giaiNhi = Array(PRIZE_CONFIG["ВТОРОЕ МЕСТО"]).fill("ВТОРОЕ МЕСТО");
    const giaiNhat = Array(PRIZE_CONFIG["ПЕРВОЕ МЕСТО"]).fill("ПЕРВОЕ МЕСТО");
    const dacBiet = Array(PRIZE_CONFIG["СПЕЦИАЛЬНОЕ МЕСТО"]).fill(
      "СПЕЦИАЛЬНОЕ МЕСТО",
    );

    //QUAN TRỌNG: đảo ngược vì dùng pop()
    prizePool.current = [
      ...dacBiet,
      ...giaiNhat,
      ...giaiNhi,
      ...giaiBa,
      ...khuyenKhich,
    ];
  }

  /* khởi tạo pool giải */
  // if (!prizePool.current) {
  //   const prizes: PrizeType[] = Object.entries(PRIZE_CONFIG).flatMap(
  //     ([prize, count]) => Array(count).fill(prize as PrizeType),
  //   );

  //   // 1. Tách GIẢI NHẤT (mới)
  //   const firstIndex = prizes.findIndex((p) => p === "GIẢI NHẤT");
  //   const firstPrize = prizes.splice(firstIndex, 1)[0]; // lấy ra 1 giải nhất

  //   // 2. Shuffle các giải còn lại (mới)
  //   const shuffled = shuffle(prizes);
  //   prizePool.current = [firstPrize, ...shuffled];
  //   //prizePool.current = shuffle(prizes); đây là code cũ chưa cho giải nhất lên đầu
  // }

  const draw = () => {
    const numbers = numberPool.current!;
    const prizes = prizePool.current!;

    if (numbers.length === 0) {
      throw new Error("Hết số!");
    }

    if (prizes.length === 0) {
      throw new Error("Hết giải!");
    }

    const number = numbers.pop()!;
    const prize = prizes.pop()!;

    return { number, prize };
  };

  return { draw };
}

// Giải đặc biệt → СПЕЦИАЛЬНОЕ МЕСТО
// Giải nhất → ПЕРВОЕ МЕСТО
// Giải nhì → ВТОРОЕ МЕСТО
// Giải ba → ТРЕТЬЕ МЕСТО
// Giải khuyến khích → ПООЩРИТЕЛЬНЫЙ ПРИЗ
