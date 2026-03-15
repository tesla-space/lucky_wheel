import "./innerWheel.css";

type Props = {
  number: number;
  onSpin: () => void;
  spinning: boolean;
  result: string | null;
};

export default function InnerWheel({
  number,
  onSpin,
  spinning,
  result,
}: Props) {
  const canPlay = !spinning && !result;

  return (
    <div className="inner-wheel" onClick={canPlay ? onSpin : undefined}>
      {spinning || result ? (
        <div className="number">{number.toString().padStart(3, "0")}</div>
      ) : (
        <div className="play">PLAY</div>
      )}
    </div>
  );
}
