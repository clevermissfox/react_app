export default function LogoItem({ item, isSelected, isFirst, onClick }) {
  return (
    <li className="logo-item">
      <button
        aria-label={item.name}
        title={item.name}
        role="option"
        aria-selected={isSelected}
        aria-controls="content-column"
        onClick={() => onClick(item)}
      >
        <svg className="icon" style={{ width: "100%" }} viewBox="0 0 150 150">
          <use href={`#${item.svgID}`} />
        </svg>
      </button>
    </li>
  );
}
