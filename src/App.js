import "./styles.css";
import ThemeProvider from "./context/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DialogProvider } from "./context/DialogContext";
import NavBar from "./components/NavBar";
import ThemeToggle from "./components/ThemeToggle";
import Main from "./components/Main";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <DialogProvider>
          <Routes>
            <Route Route path="/:dialogId?" element={<Main />} />
          </Routes>
          <ThemeToggle />
        </DialogProvider>
      </Router>
    </ThemeProvider>
  );
}
