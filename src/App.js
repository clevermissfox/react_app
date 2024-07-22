import "./styles.css";
import ThemeProvider from "./context/ThemeProvider";
import NavBar from "./components/NavBar";
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <NavBar />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
