export default function AppleButtonApplication({
  classes,
  imgClasses,
  dataName,
  imgSrc,
  handleClick,
  disabled,
}) {
  return (
    <button
      type="button"
      className={classes ? classes : undefined}
      data-name={dataName}
      title={dataName}
      aria-label={dataName}
      disabled={disabled}
      onClick={handleClick || undefined}
    >
      <img
        className={imgClasses ? imgClasses : undefined}
        src={imgSrc}
        alt={`${dataName} icon`}
        width="48"
        height="48"
      />
    </button>
  );
}
