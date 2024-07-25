import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function FileExplorer() {
  const { theme } = useContext(ThemeContext);

  return (
    <div id="fileExplorer" className="file-explorer">
        <header className={`row gap-1 ${theme === 'microsoft' && 'jc-end'}`}>
            <button aria-label='Close button'>
                {theme === 'microsoft' && <img src="/assets/icons/generic/icon-generic_xmark.svg" alt="" />}
            </button>
        </header>
    </div>
  )
}