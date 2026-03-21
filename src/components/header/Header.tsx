import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header-dots"></div>

      <div className="header-text">
        <div className="title-top">
          Российско-Вьетнамский{" "}
          <span className="break-mobile">тропический центр</span>
        </div>

        <div className="title-bottom-wrapper">
          <div className="title-bottom">Колесо удачи</div>
        </div>
      </div>
    </div>
  );
}
