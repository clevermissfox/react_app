export default function MicrosoftButtonApplication({
  classes,
  dataName,
  imgSrc,
  disabled,
  handleClick,
}) {
  return (
    <button
      className={`wind-desktop-btn ${classes}`}
      aria-label={dataName}
      disabled={disabled}
      onClick={handleClick ? () => handleClick() : undefined}
    >
      <div className="wind-desktop-icon">
        <img src={imgSrc} alt={`${dataName} icon`} />
      </div>
      <p className="small">{dataName}</p>
    </button>
  );
}
