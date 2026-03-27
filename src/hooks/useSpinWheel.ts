import { useState, useRef, useEffect } from "react";
import useLuckyWheel from "./useLuckyWheel";
import spinSound from "../assets/sounds/spin.mp3";
import confetti from "canvas-confetti";
import { PRIZES } from "../constants/prizes";
const SPIN_DURATION = 10000;
const RESULT_DURATION = 10000;

export default function useSpinWheel() {
  //const [rotation, setRotation] = useState(0); // cũ
  const rotationRef = useRef(0); // lưu góc quay hiện tại (KHÔNG render lại UI)
  const wheelRef = useRef<HTMLDivElement | null>(null); //trỏ trực tiếp DOM để điều khiển CSS
  const [number, setNumber] = useState(0); // hiển thị số trúng giải & random số innerWheel
  const [spinning, setSpinning] = useState(false); // quay
  const [result, setResult] = useState<string | null>(null);

  const stopRef = useRef(false);
  const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const [history, setHistory] = useState<{ number: number; prize: string }[]>(
    [],
  );
  const { draw } = useLuckyWheel();
  // PRELOAD AUDIO

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

  // CONFETTI

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

  // SPIN LOGIC
  const spin = () => {
    if (spinning) return;
    setResult(null);
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
    }

    // LẤY KẾT QUẢ
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

    // PLAY AUDIO (INSTANT)
    if (spinAudioRef.current) {
      const audio = spinAudioRef.current;
      audio.currentTime = 0; // Đưa audio về lại giây 0 phát lại từ đầu
      audio.play().catch(() => {
        console.log("Audio bị chặn");
      });
    }
    // ===== code cũ ======

    const prizeIndex = PRIZES.findIndex((p) => p.label === prize); // mới
    const sectorCount = PRIZES.length; // mới
    const anglePerSector = 360 / sectorCount; // mới
    const pointerAngle = 270;
    const safePadding = anglePerSector * 0.2; // mới
    const randomOffset =
      (Math.random() - 0.5) * (anglePerSector - safePadding * 2); // mới
    const sectorCenter = prizeIndex * anglePerSector + anglePerSector / 2;
    let targetAngle = pointerAngle - sectorCenter + randomOffset;
    targetAngle = (targetAngle + 360) % 360;
    const extraSpin = 360 * 6;

    // đây là tạo quay mới
    if (wheelRef.current) {
      const current = rotationRef.current;
      const normalized = current % 360;
      const delta = targetAngle - normalized;
      const finalRotation = current + extraSpin + delta;
      rotationRef.current = finalRotation;

      // None: dùng để tắt enimation cũ, tránh nối gây giật
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `translateZ(0) rotate(${normalized}deg)`;

      // đây là dòng quan trọng chống rung, vì nó ép browser render từng bước riêng biệt (không gộp)
      void wheelRef.current.offsetHeight;

      // translateZ(0) GPU tăng mượt
      wheelRef.current.style.transition =
        "transform 10s cubic-bezier(0.22, 1, 0.36, 1)";
      wheelRef.current.style.transform = `translateZ(0) rotate(${finalRotation}deg)`;
    }

    // ====== Hiệu ứng số chạy mới ====
    let animationId: number; // Id của animationFrame
    let lastTime = 0;
    const roll = (time: number) => {
      if (stopRef.current) return;
      // throttle để tránh render quá nhiều
      if (time - lastTime > 80) {
        //chỉ update mỗi ~80ms
        setNumber(Math.floor(Math.random() * 130) + 1);
        lastTime = time; // cập nhật thời gian để lần sau tính khoảng cách
      }
      animationId = requestAnimationFrame(roll); // loop liên tục gióng setIntervel
    };
    animationId = requestAnimationFrame(roll); // Khởi động animation

    //  KẾT THÚC SPIN

    setTimeout(() => {
      stopRef.current = true;
      //clearInterval(roll); // cũ
      cancelAnimationFrame(animationId); // mới
      setNumber(targetNumber);
      // Chèn ngay sau khi có kết quả
      setHistory((prev) => [...prev, { number: targetNumber, prize }]);
      /* STOP AUDIO */
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
      }

      setTimeout(() => {
        const formattedNumber = String(targetNumber).padStart(3, "0");
        const message = `ПОЗДРАВЛЯЕМ! ВЫПАЛ НОМЕР: ${formattedNumber} - ${prize}`;

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
    wheelRef,
    number,
    spinning,
    result,
    setResult,
    spin,
    history,
  };
}

// ==== HIỆU ỨNG SỐ CHẠY (cũ) =======
// const roll = setInterval(() => {
//   if (!stopRef.current) {
//     setNumber(Math.floor(Math.random() * 130) + 1);
//   }
// }, 60);

// ===== Đây là cũ =====
// setRotation((prev) => {
//   const normalized = prev % 360;s
//   const delta = targetAngle - normalized;

//   return prev + extraSpin + delta;
// });
