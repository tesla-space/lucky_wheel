import { useRef } from "react";

export type PrizeType = "GIẢI NHẤT" | "GIẢI NHÌ" | "GIẢI BA" | "KHUYẾN KHÍCH";

/* cấu hình số lượng giải */
const PRIZE_CONFIG: Record<PrizeType, number> = {
  "GIẢI NHẤT": 1,
  "GIẢI NHÌ": 2,
  "GIẢI BA": 3,
  "KHUYẾN KHÍCH": 9,
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
    const nums = Array.from({ length: 130 }, (_, i) => i + 1);

    numberPool.current = shuffle(nums);
  }

  /* khởi tạo pool giải */
  if (!prizePool.current) {
    const prizes: PrizeType[] = Object.entries(PRIZE_CONFIG).flatMap(
      ([prize, count]) => Array(count).fill(prize as PrizeType),
    );

    prizePool.current = shuffle(prizes);
  }

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
