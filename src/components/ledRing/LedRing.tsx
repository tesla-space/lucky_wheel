// import "./led.css";

// const LED_COUNT = 40;
// const RADIUS = 198; // chỉnh lại

// export default function LedRing() {
//   const leds = Array.from({ length: LED_COUNT });

//   return (
//     <div className="led-container">
//       {leds.map((_, i) => {
//         const angle = (360 / LED_COUNT) * i;

//         return (
//           <div
//             key={i}
//             className="led"
//             style={{
//               transform: `rotate(${angle}deg) translate(${RADIUS}px)`,
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }

import "./led.css";

const LED_COUNT = 40;
const RADIUS = 188;
const CENTER = 200; // vì wheel size = 400

export default function LedRing() {
  const leds = Array.from({ length: LED_COUNT });

  return (
    <div className="led-container">
      {leds.map((_, i) => {
        const angle = (i / LED_COUNT) * Math.PI * 2;

        const x = CENTER + Math.cos(angle) * RADIUS;
        const y = CENTER + Math.sin(angle) * RADIUS;

        return (
          <div
            key={i}
            className="led"
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
          />
        );
      })}
    </div>
  );
}
