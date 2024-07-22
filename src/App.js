import "./styles.css";
import ThemeProvider from "./context/ThemeProvider";
import NavBar from "./components/NavBar";
import ThemeToggle from './components/ThemeToggle'
import Main from "./components/Main";

export default function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <NavBar />
        <Main />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
