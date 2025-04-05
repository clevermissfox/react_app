import { createContext, useState, useRef, useContext } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState({});
  const dialogRefs = useRef({});

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
        },
      };
    });
  };

  const openDialog = (id) => {
    setDialogs((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true },
    }));
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
