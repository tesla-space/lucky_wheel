// import WheelSVG from "./components/wheel/WheelSVG";
// import Pointer from "./components/pointer/Pointer";
// import InnerWheel from "./components/innerWheel/InnerWheel";
// import LedRing from "./components/ledRing/LedRing";

// import useSpinWheel from "./hooks/useSpinWheel";

// import "./App.css";

// export default function App() {
//   const { rotation, number, spinning, spin } = useSpinWheel();

//   return (
//     <div className="app">
//       <Pointer />

//       <LedRing />

//       <div
//         style={{
//           transform: `rotate(${rotation}deg)`,
//           transition: "transform 7s cubic-bezier(0.22, 1, 0.36, 1)",
//         }}
//       >
//         <WheelSVG />
//       </div>

//       <InnerWheel number={number} spinning={spinning} onSpin={spin} />
//     </div>
//   );
// }

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

  return (
    <div className="app">
      {/* HEADER */}
      <div className="header-area">
        <Header />
      </div>

      {/* WHEEL */}
      <div className="wheel-area">
        <Pointer />

        <LedRing />

        <div
          className="wheel-rotation"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <WheelSVG />
        </div>

        <InnerWheel
          number={number}
          spinning={spinning}
          result={result}
          onSpin={spin}
        />

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
