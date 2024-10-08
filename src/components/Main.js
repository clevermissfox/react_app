import { useContext, useState, useCallback, useRef } from "react";
import ThemeContext from "../context/ThemeContext";
import AppleTaskbar from "./AppleComponents/AppleTaskbar";
import { supabase } from "../config/supabase-config";

export default function Main() {
    const { theme } = useContext(ThemeContext);
    const [portfolioData, setPortfolioData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dialogRef = useRef(null);
    const [currentIframeUrl, setCurrentIframeUrl] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
              .from('Live-Projects')
              .select('*');
            
            if (error) throw error;
            
            setPortfolioData(data);
            console.log('Fetched data:', data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    function handleButtonClick (url) {
        setCurrentIframeUrl(url);
        dialogRef.current.showModal();
      };

    function handleCloseIframeModal() {
        dialogRef.current.close();
        setCurrentIframeUrl(null);
    }

    return (
        <main className="main">
            {theme === 'apple' && <AppleTaskbar />}
            {theme === 'microsoft' && <p>This is microsoft main</p>}
            <button onClick={fetchData} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Fetch'}
            </button>
            {error && <p className="error">Error: {error}</p>}
            {portfolioData && 
            <div className="portfolio-grid-wrapper">
                <div className="portfolio-grid">
                    {portfolioData.map(data => (
                        <button onClick={() => handleButtonClick(data.url)} data-id={data.id} key={data.id} className="portfolio-img-wrapper">
                            <h2 className="visually-hidden">{data.name}</h2>
                            <img src={data.imgUrl} alt={data.name} />
                        </button>
                    ))}
                </div>
            </div>
            }

            <dialog ref={dialogRef}>
                {currentIframeUrl && (
                <iframe
                    src={currentIframeUrl}
                    title="Portfolio Item"
                    width="100%"
                    height="500px"
                    frameBorder="0"
                ></iframe>
                )}
                <button onClick={handleCloseIframeModal}>Close</button>
            </dialog>
        </main>
    )
}