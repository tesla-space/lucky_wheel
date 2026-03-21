import { useState, useRef, useEffect } from "react";
import useLuckyWheel from "./useLuckyWheel";
import spinSound from "../assets/sounds/spin.mp3";
import confetti from "canvas-confetti";

const SPIN_DURATION = 10000;
const RESULT_DURATION = 10000;

export default function useSpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [number, setNumber] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const stopRef = useRef(false);
  const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);

  const { draw } = useLuckyWheel();

  /* =========================
     PRELOAD AUDIO
  ========================= */
  useEffect(() => {
    const audio = new Audio(spinSound);

    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";

    // warm-up để tránh bị delay / bị chặn
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {});

    spinAudioRef.current = audio;
  }, []);

  /* =========================
     CONFETTI
  ========================= */
  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  /* =========================
     SPIN LOGIC
  ========================= */
  const spin = () => {
    if (spinning) return;

    setResult(null);

    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
    }

    /* LẤY KẾT QUẢ */
    let targetNumber: number;
    let prize: string;

    try {
      const drawResult = draw();
      targetNumber = drawResult.number;
      prize = drawResult.prize;
    } catch {
      alert("Đã hết giải thưởng!");
      return;
    }

    setSpinning(true);
    stopRef.current = false;

    /* =========================
       PLAY AUDIO (INSTANT)
    ========================= */
    if (spinAudioRef.current) {
      const audio = spinAudioRef.current;

      audio.currentTime = 0; // Đưa audio về lại giây 0 phát lại từ đầu

      audio.play().catch(() => {
        console.log("Audio bị chặn");
      });
    }

    /* =========================
       TÍNH GÓC QUAY VÀ KIM CHỈ VÀO GIẢI THƯỞNG
    ========================= */
    const prizeMap: Record<string, number> = {
      "GIẢI NHẤT": 0,
      "GIẢI NHÌ": 1,
      "GIẢI BA": 2,
      "KHUYẾN KHÍCH": 3,
    };

    const prizeIndex = prizeMap[prize];

    const sectorCount = 4;
    const anglePerSector = 360 / sectorCount;

    const pointerAngle = 270;
    const margin = 12;

    const randomOffset =
      Math.random() * (anglePerSector - margin * 2) -
      (anglePerSector / 2 - margin);

    const sectorCenter = prizeIndex * anglePerSector + anglePerSector / 2;

    let targetAngle = pointerAngle - sectorCenter + randomOffset;

    targetAngle = (targetAngle + 360) % 360;

    const extraSpin = 360 * 8;

    setRotation((prev) => {
      const normalized = prev % 360;
      const delta = targetAngle - normalized;

      return prev + extraSpin + delta;
    });

    /* =========================
       HIỆU ỨNG SỐ CHẠY
    ========================= */
    const roll = setInterval(() => {
      if (!stopRef.current) {
        setNumber(Math.floor(Math.random() * 130) + 1);
      }
    }, 60);

    /* =========================
       KẾT THÚC SPIN
    ========================= */
    setTimeout(() => {
      stopRef.current = true;

      clearInterval(roll);

      setNumber(targetNumber);

      /* STOP AUDIO */
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
      }

      setTimeout(() => {
        const formattedNumber = String(targetNumber).padStart(3, "0");
        const message = `Chúc mừng số: ${formattedNumber} - ${prize}`;

        setResult(message);
        setSpinning(false);

        fireConfetti();

        resultTimerRef.current = setTimeout(() => {
          setResult(null);
        }, RESULT_DURATION);
      }, 50);
    }, SPIN_DURATION);
  };

  return {
    rotation,
    number,
    spinning,
    result,
    setResult,
    spin,
  };
}

// import { useState, useRef, useEffect } from "react";
// import useLuckyWheel from "./useLuckyWheel";
// import spinSound from "../assets/sounds/spin.mp3";
// import confetti from "canvas-confetti";

// const SPIN_DURATION = 10000;
// const RESULT_DURATION = 10000;

// export default function useSpinWheel() {
//   const [rotation, setRotation] = useState(0);
//   const [number, setNumber] = useState(0);
//   const [spinning, setSpinning] = useState(false);
//   const [result, setResult] = useState<string | null>(null);

//   const stopRef = useRef(false);
//   const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const spinAudioRef = useRef<HTMLAudioElement | null>(null);
//   useEffect(() => {
//     const audio = new Audio(spinSound);

//     audio.loop = true;
//     audio.volume = 0.5;

//     // preload
//     audio.preload = "auto";

//     spinAudioRef.current = audio;
//   }, []);

//   const { draw } = useLuckyWheel();

//   /* confetti */
//   const fireConfetti = () => {
//     const duration = 3000;
//     const end = Date.now() + duration;

//     const frame = () => {
//       confetti({
//         particleCount: 6,
//         angle: 60,
//         spread: 60,
//         origin: { x: 0 },
//       });

//       confetti({
//         particleCount: 6,
//         angle: 120,
//         spread: 60,
//         origin: { x: 1 },
//       });

//       if (Date.now() < end) {
//         requestAnimationFrame(frame);
//       }
//     };

//     frame();
//   };

//   const spin = () => {
//     if (spinning) return;

//     /* reset result */
//     setResult(null);

//     if (resultTimerRef.current) {
//       clearTimeout(resultTimerRef.current);
//     }

//     /* kiểm tra draw */
//     let targetNumber: number;
//     let prize: string;

//     try {
//       const drawResult = draw();

//       targetNumber = drawResult.number;
//       prize = drawResult.prize;
//     } catch {
//       alert("Đã hết giải thưởng!");
//       return;
//     }

//     setSpinning(true);
//     stopRef.current = false;

//     /* phát nhạc quay */
//     if (!spinAudioRef.current) {
//       spinAudioRef.current = new Audio(spinSound);
//       spinAudioRef.current.loop = true;
//       spinAudioRef.current.volume = 0.5;
//     }

//     spinAudioRef.current.currentTime = 0;
//     spinAudioRef.current.play();

//     /* mapping sector */
//     const prizeMap: Record<string, number> = {
//       "GIẢI NHẤT": 0,
//       "GIẢI NHÌ": 1,
//       "GIẢI BA": 2,
//       "KHUYẾN KHÍCH": 3,
//     };

//     const prizeIndex = prizeMap[prize];

//     const sectorCount = 4;
//     const anglePerSector = 360 / sectorCount;

//     const pointerAngle = 270;
//     const margin = 12;

//     const randomOffset =
//       Math.random() * (anglePerSector - margin * 2) -
//       (anglePerSector / 2 - margin);
//     // Lấy vị trí kim chỉ có random một xíu để tự nhiên hơn
//     const sectorCenter = prizeIndex * anglePerSector + anglePerSector / 2;

//     let targetAngle = pointerAngle - sectorCenter + randomOffset;

//     targetAngle = (targetAngle + 360) % 360; // để không bị âm

//     const extraSpin = 360 * 8; // quay thêm 8 vòng cho đẹp

//     setRotation((prev) => {
//       const normalized = prev % 360; // Đây là vị trí thực của vòng quay
//       const delta = targetAngle - normalized; // góc cần quay thêm

//       return prev + extraSpin + delta; // lấy góc hiện tại + 6 vòng + góc cần quay thêm
//     });

//     /* hiệu ứng số chạy */
//     const roll = setInterval(() => {
//       if (!stopRef.current) {
//         setNumber(Math.floor(Math.random() * 130) + 1);
//       }
//     }, 60);

//     setTimeout(() => {
//       stopRef.current = true;

//       clearInterval(roll);

//       setNumber(targetNumber);

//       /* dừng nhạc */
//       if (spinAudioRef.current) {
//         spinAudioRef.current.pause();
//       }

//       setTimeout(() => {
//         const formattedNumber = String(targetNumber).padStart(3, "0");
//         const message = `Chúc mừng số: ${formattedNumber} - ${prize}`;

//         setResult(message);
//         setSpinning(false);

//         fireConfetti();

//         resultTimerRef.current = setTimeout(() => {
//           setResult(null);
//         }, RESULT_DURATION);
//       }, 50);
//     }, SPIN_DURATION);
//   };

//   return {
//     rotation,
//     number,
//     spinning,
//     result,
//     setResult,
//     spin,
//   };
// }
