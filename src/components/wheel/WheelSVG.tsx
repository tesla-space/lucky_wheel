// src/components/wheel/wheelSVG.tsx

import "./wheel.css";
import { PRIZES } from "../../constants/prizes";

type Prize = {
  label: string;
  color: string;
};

const prizes: Prize[] = PRIZES;

type Props = {
  wheelSize: number; // nhận từ App.tsx
};

export default function WheelSVG({ wheelSize }: Props) {
  const size = wheelSize;
  const center = size / 2;
  const radius = size / 2 - 20; // để path và text nằm gọn trong wheel

  // Hàm tính tọa độ x, y
  function polarToCartesian(
    centerX: number,
    centerY: number,
    r: number,
    angleDeg: number,
  ) {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(angleRad),
      y: centerY + r * Math.sin(angleRad),
    };
  }

  // Hàm tính cung cần vẽ
  function describeArc(startAngle: number, endAngle: number) {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
      Z
    `;
  }

  const anglePerSector = 360 / prizes.length;

  return (
    <div className="wheel-container">
      <svg
        className="wheel-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {prizes.map((prize, i) => {
          const startAngle = i * anglePerSector;
          const endAngle = startAngle + anglePerSector;
          const textAngle = startAngle + anglePerSector / 2;
          const textPos = polarToCartesian(
            center,
            center,
            radius * 0.65,
            textAngle,
          );

          // điều chỉnh kích cỡ và màu của chữ nếu có
          const baseFont = size <= 300 ? 5.5 : 10;
          const smallFont = size <= 300 ? 5.5 : 9.56;
          const currentFontSize =
            prize.label === "ПООЩРИТЕЛЬНЫЙ ПРИЗ" ? smallFont : baseFont;

          return (
            <g key={i}>
              <path
                d={describeArc(startAngle, endAngle)}
                fill={prize.color}
                stroke="#fff"
                strokeWidth="3"
              />
              <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                fontSize={currentFontSize}
                fontWeight="bold"
                transform={`rotate(${textAngle} ${textPos.x} ${textPos.y})`}
              >
                {prize.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
