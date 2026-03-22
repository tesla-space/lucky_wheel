// src/components/ledRing/LedRing.tsx
import "./led.css";

const LED_COUNT = 40;

type Props = {
  wheelSize: number; // nhận từ App.tsx
};

export default function LedRing({ wheelSize }: Props) {
  // Bán kính LED nằm vừa ngoài wheel
  const ratio = wheelSize <= 200 ? 0.42 : 0.47;
  const RADIUS = wheelSize * ratio;
  const CENTER = wheelSize / 2;

  const leds = Array.from({ length: LED_COUNT });

  // Kích thước LED co theo wheelSize, nhưng giữ tỉ lệ desktop & mobile
  const ledSize = Math.max(5, wheelSize * 0.028);
  //const ledSize = 10; // tối thiểu 5px

  return (
    <div
      className="led-container"
      style={{
        width: `${wheelSize}px`,
        height: `${wheelSize}px`,
      }}
    >
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
              width: `${ledSize}px`,
              height: `${ledSize}px`,
            }}
          />
        );
      })}
    </div>
  );
}
