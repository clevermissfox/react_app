import { useContext, useRef, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { useDialog } from "../context/DialogContext";

export default function Dialog({ id, classes = "", children }) {
  const { theme } = useContext(ThemeContext);
  const dialogRef = useRef(null);
  const {
    dialogs,
    registerDialog,
    closeDialog,
    minimizeDialog,
    maximizeDialog,
  } = useDialog();

  useEffect(() => {
    registerDialog(id);
  }, [id, registerDialog]);

  // Get dialog state from context
  const {
    isOpen = false,
    isMinimized = false,
    isMaximized = false,
    zIndex = 0,
  } = dialogs[id] || {};

  // Open/close dialog based on context state
  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.show();
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={`${isMaximized ? "maximized" : ""} ${
        isMinimized ? "minimized" : ""
      } ${classes}`}
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
              onClick={() => closeDialog(id)}
            >
              <i className="fa fa-xmark" aria-hidden="true"></i>
            </button>
            <button
              className="grid pi-cen"
              data-btn-minimize-dialog
              aria-label="Minimize dialog"
              onClick={() => minimizeDialog(id)}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button
              className="grid pi-cen"
              data-btn-maximize-dialog
              aria-label="Maximize dialog"
              onClick={() => maximizeDialog(id)}
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
              onClick={() => minimizeDialog(id)}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button
              className="grid pi-cen"
              data-btn-maximize-dialog
              aria-label="Maximize dialog"
              onClick={() => maximizeDialog(id)}
            >
              <i className="far fa-square" aria-hidden="true"></i>
            </button>
            <button
              className="grid pi-cen"
              data-btn-close-dialog
              aria-label="Close dialog"
              onClick={() => closeDialog(id)}
            >
              <i className="fa fa-xmark" aria-hidden="true"></i>
            </button>
          </>
        )}
      </div>
      <div className="dialog-content">{children}</div>
    </dialog>
  );
}
