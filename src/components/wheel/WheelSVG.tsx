// src/components/wheel/wheelSVG.tsx

import "./wheel.css";

type Prize = {
  label: string;
  color: string;
};

const prizes: Prize[] = [
  { label: "GIẢI NHẤT", color: "#FFD700" },
  { label: "GIẢI NHÌ", color: "#4DA6FF" },
  { label: "GIẢI BA", color: "#4CAF50" },
  { label: "KHUYẾN KHÍCH", color: "#FF9800" },
];

type Props = {
  wheelSize: number; // nhận từ App.tsx
};

export default function WheelSVG({ wheelSize }: Props) {
  const size = wheelSize;
  const center = size / 2;
  const radius = size / 2 - 20; // để path và text nằm gọn trong wheel

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
  const fontSize = size <= 300 ? 8 : 15; // co theo wheelSize

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
                fontSize={fontSize}
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
