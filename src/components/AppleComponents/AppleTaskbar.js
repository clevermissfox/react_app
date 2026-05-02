import AppleButtonApplication from "./AppleButtonApplication";
import { useDialog } from "../../context/DialogContext";

export default function AppleTaskbar({ appIcons }) {
  const { dialogs } = useDialog();

  return (
    <div className="taskbar">
      {appIcons.map((icon) => {
        const dialogId = icon.dialogId;
        const hasActiveInGroup = Object.entries(dialogs).some(
          ([id, d]) =>
            (d.isOpen || d.isMinimized) &&
            (id === dialogId || d.parentAppId === dialogId),
        );

        const combinedClasses = hasActiveInGroup
          ? `${icon.classes || ""} has-dot`.trim()
          : icon.classes;

        return (
          <AppleButtonApplication
            key={icon.name}
            classes={combinedClasses}
            dataName={icon.name}
            imgSrc={icon.imgSrc}
            imgClasses={icon.imgClasses}
            handleClick={icon.handleClick}
            disabled={icon.disabled ? icon.disabled : false}
          />
        );
      })}
    </div>
  );
}
