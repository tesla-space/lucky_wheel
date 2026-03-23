import "./ResultBoard.css";

type Result = {
  prize: string;
  number: number;
};

type Props = {
  results: Result[];
};

export default function ResultBoard({ results }: Props) {
  const renderGroup = (label: string) => {
    const items = results.filter((r) => r.prize === label);

    return (
      <div className={`group ${label}`} key={label}>
        {/* TITLE */}
        <div className="title">{label}</div>

        {/* BOX CHỨA SỐ */}
        <div className="numbers">
          {items.map((item, i) => (
            <span key={i}>{String(item.number).padStart(3, "0")}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="result-board">
      {renderGroup("GIẢI ĐẶC BIỆT")}
      {renderGroup("GIẢI NHẤT")}
      {renderGroup("GIẢI NHÌ")}
      {renderGroup("GIẢI BA")}
      {renderGroup("KHUYẾN KHÍCH")}
    </div>
  );
}
