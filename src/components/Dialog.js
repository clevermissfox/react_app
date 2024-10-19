import { useContext, useRef, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";

export default function Dialog({ children, isDialogOpen, onDialogClose }) {
  const { theme } = useContext(ThemeContext);
  const [isDialogMaximized, setIsDialogMaximized] = useState(false);
  const [isDialogMinimized, setIsDialogMinimized] = useState(false);
  const dialogRef = useRef(null);

  function toggleDialogMaximized() {
    setIsDialogMaximized((prevValue) => !prevValue);
    setIsDialogMinimized(false);
  }

  function minimizeDialog() {
    setIsDialogMaximized(false);
    setIsDialogMinimized(true);
  }

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
      setIsDialogMinimized(false);
    }
  }, [isDialogOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={`${isDialogMaximized ? "maximized" : ""}${
        isDialogMinimized ? "minimized" : ""
      }`}
    >
      <div
        className={`utility-bar row ${
          theme === "apple" ? "ai-cen jc-st" : "jc-end"
        } `}
      >
        {theme === "apple" && (
          <>
            <button
              className="grid pi-cen"
              data-btn-close-dialog
              aria-label="Close dialog"
              onClick={onDialogClose}
            >
              <i className="fa fa-xmark" aria-hidden="true"></i>
            </button>
            <button
              className="grid pi-cen"
              data-btn-minimize-dialog
              aria-label="Minimize dialog"
              onClick={minimizeDialog}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button
              className="grid pi-cen"
              data-btn-maximize-dialog
              aria-label="Maximize dialog"
              onClick={toggleDialogMaximized}
            >
              <i className="fas fa-plus" aria-hidden="true"></i>
            </button>
          </>
        )}
        {theme === "microsoft" && (
          <>
            <button
              className="grid pi-cen"
              data-btn-minimize-dialog
              aria-label="Minimize dialog"
              onClick={minimizeDialog}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button
              className="grid pi-cen"
              data-btn-maximize-dialog
              aria-label="Maximize dialog"
              onClick={toggleDialogMaximized}
            >
              <i className="far fa-square" aria-hidden="true"></i>
            </button>
            <button
              className="grid pi-cen"
              data-btn-close-dialog
              aria-label="Close dialog"
              onClick={onDialogClose}
            >
              <i className="fa fa-xmark" aria-hidden="true"></i>
            </button>
          </>
        )}
      </div>
      {children}
    </dialog>
  );
}
