import { createContext, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState({});
  // const {navigate} = useNavigate();

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
          zIndex: "auto",
        },
      };
    });
  };

  const openDialog = (id) => {
    setDialogs((prev) => {
      let highestZIndex = 0;
      Object.keys(prev).forEach((key) => {
        const dialog = prev[key];
        if (
          dialog.isOpen &&
          typeof dialog.zIndex === "number" &&
          dialog.zIndex > highestZIndex
        ) {
          highestZIndex = dialog.zIndex;
        }
      });

      const newZIndex = highestZIndex + 10;
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: true, zIndex: newZIndex },
      };
    });
  };

  const closeDialog = (id) => {
    setDialogs((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, zIndex: "auto" },
    }));
    // If the dialog was opened via a route, navigate back to the home route
    // if (window.location.pathname === `/${id}`) {
    //   navigate("/");
    // }
  };

  const minimizeDialog = (id) => {
    setDialogs((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true, isMaximized: false },
    }));
  };

  const maximizeDialog = (id) => {
    setDialogs((prev) => {
      const dialog = prev[id];
      const isMaximized = !dialog.isMaximized;
      let newZIndex = dialog.zIndex;

      if (isMaximized) {
        // Maximizing: find the highest z-index and set this dialog's z-index 10 higher
        let highestZIndex = 0;
        Object.keys(prev).forEach((key) => {
          const otherDialog = prev[key];
          if (
            otherDialog.isOpen &&
            typeof otherDialog.zIndex === "number" &&
            otherDialog.zIndex > highestZIndex
          ) {
            highestZIndex = otherDialog.zIndex;
          }
        });
        newZIndex = highestZIndex + 10;
      } else {
        // Unmaximizing: revert to the previous z-index
        newZIndex = 10;
      }

      return {
        ...prev,
        [id]: {
          ...dialog,
          isMaximized: isMaximized,
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
