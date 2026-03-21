import "./innerWheel.css";

type Props = {
  wheelSize: number; // nhận từ App.tsx
  number: number;
  onSpin: () => void;
  spinning: boolean;
  result: string | null;
};

export default function InnerWheel({
  wheelSize,
  number,
  onSpin,
  spinning,
  result,
}: Props) {
  const canPlay = !spinning && !result;

  // Tỉ lệ inner wheel với wheel container
  const innerSize = wheelSize * 0.275; // 110/400 ≈ 0.275
  const playFont = innerSize * 0.2; // font PLAY
  const numberFont = innerSize * 0.36; // font number

  return (
    <div
      className="inner-wheel"
      onClick={canPlay ? onSpin : undefined}
      style={{ width: innerSize, height: innerSize }}
    >
      {spinning || result ? (
        <div className="number" style={{ fontSize: numberFont }}>
          {number.toString().padStart(3, "0")}
        </div>
      ) : (
        <div className="play" style={{ fontSize: playFont }}>
          PLAY
        </div>
      )}
    </div>
  );
}
