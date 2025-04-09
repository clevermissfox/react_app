import { useContext, useRef, useEffect } from "react";
import ThemeContext from "../context/ThemeContext";
import { useDialog } from "../context/DialogContext";

export default function Dialog({ id, classes, children }) {
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
    zIndex,
  } = dialogs[id] || {};

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.style.setProperty("--dialog-dynamic-z-index", zIndex);
    }
  }, [zIndex, isOpen]);

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
      className={
        [
          classes,
          isOpen && isMaximized ? "maximized" : "",
          isOpen && isMinimized ? "minimized" : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined
      }
    >
      <div
        className={`utility-bar row ${
          theme === "apple" ? "ai-cen jc-st" : "jc-end"
        } `}
      >
        {theme === "apple" && (
          <>
            <button
              type="button"
              className="grid pi-cen"
              data-btn-close-dialog
              aria-label="Close dialog"
              onClick={() => closeDialog(id)}
            >
              <i className="fa fa-xmark" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="grid pi-cen"
              data-btn-minimize-dialog
              aria-label="Minimize dialog"
              onClick={() => minimizeDialog(id)}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button
              type="button"
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
              type="button"
              className="grid pi-cen"
              data-btn-minimize-dialog
              aria-label="Minimize dialog"
              onClick={() => minimizeDialog(id)}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="grid pi-cen"
              data-btn-maximize-dialog
              aria-label="Maximize dialog"
              onClick={() => maximizeDialog(id)}
            >
              <i className="far fa-square" aria-hidden="true"></i>
            </button>
            <button
              type="button"
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
