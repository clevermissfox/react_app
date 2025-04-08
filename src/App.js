import "./styles.css";
import ThemeProvider from "./context/ThemeProvider";
import { DialogProvider } from "./context/DialogContext";
import NavBar from "./components/NavBar";
import ThemeToggle from "./components/ThemeToggle";
import Main from "./components/Main";

export default function App() {
  return (
    <ThemeProvider>
      <DialogProvider>
        <div className="App">
          <NavBar />
          <Main />
          <ThemeToggle />
        </div>
      </DialogProvider>
    </ThemeProvider>
  );
}
