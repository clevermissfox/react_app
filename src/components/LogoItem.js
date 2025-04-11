export default function LogoItem({ item, isSelected, onClick }) {
  return (
    <li className="logo-item">
      <button
        type="button"
        aria-label={item.name}
        title={item.name}
        role="option"
        aria-selected={isSelected}
        aria-controls="content-column"
        onClick={() => onClick(item)}
      >
        <svg className="icon" viewBox="0 0 150 150" width="150" height="150">
          <use href={`#${item.svgID}`} />
        </svg>
      </button>
    </li>
  );
}
