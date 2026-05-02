import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState({});
  const navigate = useNavigate();

  const createDialogState = (options = {}) => ({
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: "auto",
    parentAppId: null,
    ...options,
  });

  const getHighestZIndex = (dialogMap) => {
    let highestZIndex = 0;

    Object.keys(dialogMap).forEach((key) => {
      const dialog = dialogMap[key];
      if (
        dialog.isOpen &&
        !dialog.isMinimized &&
        typeof dialog.zIndex === "number" &&
        dialog.zIndex > highestZIndex
      ) {
        highestZIndex = dialog.zIndex;
      }
    });

    return highestZIndex;
  };

  const registerDialog = (id, options = {}) => {
    setDialogs((prev) => {
      if (prev[id]) return prev;

      return {
        ...prev,
        [id]: createDialogState(options),
      };
    });
  };

  const buildBringToFrontState = (prev, id, options = {}) => {
    const highestZIndex = getHighestZIndex(prev);
    const newZIndex = highestZIndex + 10;
    const existingDialog = prev[id];

    return {
      ...prev,
      [id]: createDialogState({
        ...existingDialog,
        ...options,
        isOpen: true,
        isMinimized: false,
        zIndex: newZIndex,
      }),
    };
  };

  const bringToFront = (id, options = {}) => {
    setDialogs((prev) => buildBringToFrontState(prev, id, options));
  };

  const openDialog = (id, options = {}) => {
    setDialogs((prev) => {
      const dialog = prev[id];

      if (dialog?.isOpen && !dialog?.isMinimized) return prev;

      return buildBringToFrontState(prev, id, options);
    });
  };

  const closeDialog = (id) => {
    setDialogs((prev) => ({
      ...prev,
      [id]: {
        ...createDialogState(),
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: "auto",
      },
    }));

    if (window.location.pathname === `/${id}`) {
      navigate("/");
    }
  };

  const minimizeDialog = (id) => {
    setDialogs((prev) => ({
      ...prev,
      [id]: {
        ...createDialogState(),
        ...prev[id],
        isMinimized: true,
        lastMinimizedAt: Date.now(),
      },
    }));
  };

  const toggleMinimizeDialog = (id) => {
    setDialogs((prev) => {
      const dialog = prev[id];
      if (!dialog?.isOpen) return prev;

      const willBeMinimized = !dialog.isMinimized;

      if (!willBeMinimized) {
        const highestZIndex = getHighestZIndex(prev);
        const newZIndex = highestZIndex + 10;

        return {
          ...prev,
          [id]: {
            ...createDialogState(),
            ...dialog,
            isMinimized: false,
            zIndex: newZIndex,
          },
        };
      }

      return {
        ...prev,
        [id]: {
          ...createDialogState(),
          ...dialog,
          isMinimized: true,
          lastMinimizedAt: Date.now(),
        },
      };
    });
  };

  const maximizeDialog = (id) => {
    setDialogs((prev) => {
      const dialog = prev[id];
      if (!dialog) return prev;

      const isMaximized = !dialog.isMaximized;
      const newZIndex = isMaximized ? getHighestZIndex(prev) + 10 : 10;

      return {
        ...prev,
        [id]: {
          ...createDialogState(),
          ...dialog,
          isMaximized,
          isMinimized: false,
          zIndex: newZIndex,
        },
      };
    });
  };

  return (
    <DialogContext.Provider
      value={{
        dialogs,
        registerDialog,
        openDialog,
        closeDialog,
        minimizeDialog,
        toggleMinimizeDialog,
        maximizeDialog,
        bringToFront,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
