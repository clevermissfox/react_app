import "./styles.css";
import ThemeProvider from "./context/ThemeProvider";
import NavBar from "./components/NavBar";
import ThemeToggle from './components/ThemeToggle'
import Main from "./components/Main";
// import FileExplorer from "./components/FileExplorer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <NavBar />
        <Main />
        {/* <FileExplorer /> */}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
