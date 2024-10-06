import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import AppleExplorer from "./AppleComponents/AppleExplorer";

export default function Main() {
    const { theme } = useContext(ThemeContext);
    return (
        <main className="main">
            {theme === 'apple' && <AppleExplorer />}
            {theme === 'microsoft' && <p> This is microsoft main</p>}
        </main>
    )
}