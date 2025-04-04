import AppleButtonApplication from "./AppleButtonApplication";

export default function AppleTaskbar({ appIcons }) {
  return (
    <div className="taskbar">
      {appIcons.map((icon) => (
        <AppleButtonApplication
          classes={icon.classes}
          dataName={icon.name}
          imgSrc={icon.imgSrc}
          imgClasses={icon.imgClasses}
          handleClick={icon.handleClick}
          disabled={icon.disabled ? icon.disabled : false}
        />
      ))}
    </div>
  );
}
