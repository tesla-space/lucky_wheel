import { useState, useEffect } from "react";
import WheelSVG from "./components/wheel/WheelSVG";
import Pointer from "./components/pointer/Pointer";
import InnerWheel from "./components/innerWheel/InnerWheel";
import LedRing from "./components/ledRing/LedRing";
import Header from "./components/header/Header";

import useSpinWheel from "./hooks/useSpinWheel";

import "./App.css";

export default function App() {
  const { rotation, number, spinning, result, setResult, spin } =
    useSpinWheel();

  // ====== Wheel Size chung ======
  const [wheelSize, setWheelSize] = useState(400);

  useEffect(() => {
    const updateSize = () => {
      // Mobile: co thêm 10px nữa để wheel vừa màn hình
      setWheelSize(window.innerWidth <= 768 ? 270 : 400);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="app">
      {/* HEADER */}
      <div className="header-area">
        <Header />
      </div>

      {/* WHEEL */}
      <div
        className="wheel-area"
        style={{ width: wheelSize, height: wheelSize }}
      >
        {/* CHARACTERS */}
        <img
          src="/images/left-girl.png"
          className={`character left ${spinning ? "spin" : ""}`}
          alt="Left Girl"
          style={{
            width: wheelSize * 0.5, // kích thước theo wheelSize
            left: -wheelSize * 0.45, // offset xa wheel hơn
          }}
        />

        <img
          src="/images/right-girl.png"
          className={`character right ${spinning ? "spin" : ""}`}
          alt="Right Girl"
          style={{
            width: wheelSize * 0.5,
            right: -wheelSize * 0.45,
          }}
        />

        {/* POINTER */}
        <Pointer wheelSize={wheelSize} />

        {/* LED RING */}
        <LedRing wheelSize={wheelSize} />

        {/* WHEEL SVG */}
        <div
          className="wheel-rotation"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 10s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          <WheelSVG wheelSize={wheelSize} />
        </div>

        {/* INNER WHEEL */}
        <InnerWheel
          wheelSize={wheelSize}
          number={number}
          spinning={spinning}
          result={result}
          onSpin={spin}
        />

        {/* RESULT ALERT */}
        {result && (
          <div className="result-alert">
            <button className="result-close" onClick={() => setResult(null)}>
              ✕
            </button>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
