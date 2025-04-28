import { useDialog } from "../context/DialogContext";

export default function ApplicationData({ theme, ...props }) {
  const { openDialog } = useDialog();
  return [
    {
      name: theme === "apple" ? "Finder (Quote)" : "Free Quote",
      classes: null,
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_finder-logo.png"
          : "assets/icons/microsoft/icon-windows_folder-open.svg",
      imgClasses: null,
      handleClick: () => openDialog("quote"),
      disabled: false,
      isAppleOnly: false,
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
      classes: theme === "apple" ? "btn-bg" : "browse",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_safari-logo.svg"
          : "/assets/icons/microsoft/icon-windows_chrome-logo.svg",
      imgClasses: theme === "apple" ? "img-cover" : "",
      handleClick: () => openDialog("browser"),
      disabled: false,
    },
    {
      name: "Portfolio",
      classes: theme === "apple" ? "btn-bg" : "folder",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_photos-logo.webp"
          : "/assets/images/image-icons/img-windows_gallery.png",
      imgClasses: null,
      handleClick: () => {
        props.fetchPortfolioData(); // Fetch portfolio data
      },
      disabled: false,
    },
    {
      name: theme === "apple" ? "Adobe Acrobat" : "Skills",
      classes: theme === "apple" ? "btn-bg" : "resume",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_acrobat-logo.svg"
          : "/assets/images/image-icons/img-windows_pdf.png",
      imgClasses: null,
      handleClick: () => openDialog("resume"),
      disabled: false,
    },
    {
      name: "Calendar",
      classes: theme === "apple" ? "btn-bg" : "calendar",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_calendar-logo.svg"
          : "/assets/images/image-icons/img-windows_calendar.png",
      imgClasses: theme === "apple" ? "img-cover" : "",
      handleClick: () => openDialog("calendar"),
      disabled: false,
    },
    {
      name: theme === "apple" ? "Mail" : "Contact",
      classes: theme === "apple" ? "" : "contact",
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_mail-logo.svg"
          : "/assets/images/image-icons/img-windows_envelope.png",
      imgClasses: theme === "apple" ? "img-cover" : "",
      handleClick: () => openDialog("contact"),
      disabled: false,
    },
    {
      name: "Trash",
      classes: null,
      imgSrc:
        theme === "apple"
          ? "/assets/icons/apple/application-icons/icon-apple_trash-logo.png"
          : null,
      imgClasses: null,
      handleClick: () => openDialog("trash"),
      disabled: false,
      isAppleOnly: true,
    },
  ];
}
