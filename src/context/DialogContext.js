import { createContext, useState, useRef, useContext } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState({});
  const dialogRefs = useRef({});
  const [zIndexCounter, setZIndexCounter] = useState(15);

  const registerDialog = (id) => {
    setDialogs((prev) => {
      // Avoid overwriting existing dialogs
      if (prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
          zIndex: 0,
        },
      };
    });
  };

  const openDialog = (id) => {
    setDialogs((prev) => {
      const newZIndex = zIndexCounter + 1; // Increment z-index
      setZIndexCounter(newZIndex); // Update the counter
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: true, zIndex: newZIndex },
      };
    });
  };

  const closeDialog = (id) => {
    setDialogs((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const minimizeDialog = (id) => {
    setDialogs((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true, isMaximized: false },
    }));
  };

  const maximizeDialog = (id) => {
    setDialogs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id]?.isMaximized,
        isMinimized: false,
      },
    }));
  };

  return (
    <DialogContext.Provider
      value={{
        dialogs,
        registerDialog,
        openDialog,
        closeDialog,
        minimizeDialog,
        maximizeDialog,
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
