import MicrosoftButtonApplication from "./MicrosoftButtonApplication";

export default function MicrosoftDesktop({ appIcons }) {
  return (
    <div className="microsoft-desktop">
      {appIcons.map(
        (icon) =>
          !icon.isAppleOnly && (
            <MicrosoftButtonApplication
              key={icon.name}
              classes={icon.classes}
              dataName={icon.name}
              imgSrc={icon.imgSrc}
              imgClasses={icon.imgClasses}
              handleClick={icon.handleClick}
              disabled={icon.disabled ? icon.disabled : false}
            />
          )
      )}
    </div>
  );
}
