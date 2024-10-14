import { useContext, useRef, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";


export default function Dialog({children, isDialogOpen, onDialogClose}) {
    const { theme } = useContext(ThemeContext);
    const [isDialogMaximized, setIsDialogMaximized] = useState(false);
    const dialogRef = useRef(null);

    function toggleDialogSize() { setIsDialogMaximized( (prevValue) =>  !prevValue)}

    useEffect(() => {
        if (isDialogOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isDialogOpen]);

  return (
    <dialog ref={dialogRef} className={isDialogMaximized ? 'maximized' : ''}>
        <div className={`utility-bar row ${theme === 'apple' ? 'ai-cen jc-st' : 'jc-end'} `}>
            {/* if on apple theme, render red X close button first, if micorosft render maximize window button first (changing order visually doesnt change tab order) */}
            {theme === 'apple' && 
            <button className="grid pi-cen" data-btn-close-dialog aria-label="Close dialog" onClick={onDialogClose}>
                <i className="fa fa-xmark" aria-hidden="true"></i>
            </button>
            }
            {theme === 'microsoft' && 
             <button className="grid pi-cen" data-btn-maximize-dialog aria-label="Maximize dialog" onClick={toggleDialogSize}>
                <i className="fa-solid fa-plus" aria-hidden="true"></i>
            </button>
            }
            <button className="grid pi-cen" data-btn-minimize-dialog aria-label="Minimize dialog">
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>

            {theme === 'microsoft' && 
            <button className="grid pi-cen" data-btn-close-dialog aria-label="Close dialog" onClick={onDialogClose}>
                <i className="fa fa-xmark" aria-hidden="true"></i>
            </button>
            }
            {theme === 'apple' && 
             <button className="grid pi-cen" data-btn-maximize-dialog aria-label="Maximize dialog" onClick={toggleDialogSize}>
                <i className="fa-solid fa-plus" aria-hidden="true"></i>
            </button>
            }
        </div>
        {children}
    </dialog>
  )
}