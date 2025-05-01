import { useDialog } from "../context/DialogContext";

export default function ApplicationData({ theme, ...props }) {
  const { dialogs, openDialog, toggleMinimizeDialog } = useDialog();
  // Helper to create the correct onClick handler for each dialog
  function createHandleClick(dialogId, customHandler) {
    return () => {
      const dialog = dialogs[dialogId];
      if (!dialog?.isOpen) {
        if (customHandler) customHandler();
        openDialog(dialogId);
      } else if (dialog.isMinimized) {
        toggleMinimizeDialog(dialogId); // Restore
      } else {
        toggleMinimizeDialog(dialogId); // Minimize
      }
    };
  }
  return [
    {
      name: "Finder (Quote)",
      dialogId: "quote",
      classes: null,
      imgSrc:
        "/assets/icons/apple/application-icons/icon-apple_finder-logo.png",
      imgClasses: null,
      handleClick: createHandleClick("quote"),
      disabled: false,
      isAppleOnly: true,
    },
    // {
    //   name: "Preview",
    //   classes: "btn-lg",
    //   imgSrc:
    //     "/assets/icons/apple/application-icons/icon-apple_preview-logo.png",
    //   imgClasses: null,
    //   handleClick: null,
    //   disabled: false,
    //   isAppleOnly: true,
    // },
    {
      name: theme === "apple" ? "Safari" : "Chrome",
      dialogId: "browser",
      classes: theme === "apple" ? "btn-bg" : "browse",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_safari-logo.svg"
          : "/assets/icons/microsoft/icon-windows_chrome-logo.svg",
      imgClasses: theme === "apple" ? "img-cover" : "",
      handleClick: createHandleClick("browser"),
      disabled: false,
    },
    {
      name: "Portfolio",
      dialogId: "portfolio",
      classes: theme === "apple" ? "btn-bg" : "folder",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_photos-logo.webp"
          : "/assets/images/image-icons/img-windows_gallery.png",
      imgClasses: null,
      handleClick: createHandleClick("portfolio", props.fetchPortfolioData),
      disabled: false,
    },
    {
      name: theme === "apple" ? "Adobe Acrobat" : "Skills",
      classes: theme === "apple" ? "btn-bg" : "resume",
      dialogId: "resume",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_acrobat-logo.svg"
          : "/assets/images/image-icons/img-windows_pdf.png",
      imgClasses: null,
      handleClick: createHandleClick("resume"),
      disabled: false,
    },
    {
      name: "Calendar",
      dialogId: "calendar",
      classes: theme === "apple" ? "btn-bg" : "calendar",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_calendar-logo.svg"
          : "/assets/images/image-icons/img-windows_calendar.png",
      imgClasses: theme === "apple" ? "img-cover" : "",
      handleClick: createHandleClick("calendar"),
      disabled: false,
    },
    {
      name: theme === "apple" ? "Mail" : "Contact",
      dialogId: "contact",
      classes: theme === "apple" ? "" : "contact",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_mail-logo.svg"
          : "/assets/images/image-icons/img-windows_envelope.png",
      imgClasses: theme === "apple" ? "img-cover" : "",
      handleClick: createHandleClick("contact"),
      disabled: false,
    },
    {
      name: "Trash",
      dialogId: "trash",
      classes: null,
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_trash-logo.png"
          : null,
      imgClasses: null,
      handleClick: createHandleClick("trash"),
      disabled: false,
      isAppleOnly: true,
    },
  ];
}
