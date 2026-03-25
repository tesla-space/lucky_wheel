import "./pointer.css";

type Props = {
  wheelSize: number; // nhận từ App.tsx
};

export default function Pointer({ wheelSize }: Props) {
  // Tỉ lệ pointer so với wheel
  const arrowWidth = wheelSize * 0.045; // 18px desktop, scale theo wheel
  const arrowHeight = wheelSize * 0.0875; // 35px desktop, scale theo wheel

  // offset top để đầu mũi tên trùng viền ngoài wheel
  const topOffset = -arrowHeight + 15;

  return (
    <div className="pointer" style={{ top: topOffset }}>
      <div
        className="pointer-arrow"
        style={{
          borderLeft: `${arrowWidth}px solid transparent`,
          borderRight: `${arrowWidth}px solid transparent`,
          borderTop: `${arrowHeight}px solid #00b0ff`,
        }}
      />
    </div>
  );
}
