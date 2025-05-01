import AppleButtonApplication from "./AppleButtonApplication";
import { useDialog } from "../../context/DialogContext";

export default function AppleTaskbar({ appIcons }) {
  const { dialogs } = useDialog();

  return (
    <div className="taskbar">
      {appIcons.map((icon) => {
        const dialogId = icon.dialogId;
        const dialog = dialogs[dialogId] || {};
        const showWhiteDot = dialog.isOpen && dialog.isMinimized;
        // Combine existing classes with the dot indicator class
        const combinedClasses = showWhiteDot
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
