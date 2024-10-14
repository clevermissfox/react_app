import { useContext, useState, useCallback } from "react";
import { useNavbarHeight } from "../hooks/useNavBarHeight";
import ThemeContext from "../context/ThemeContext";
import { supabase } from "../config/supabase-config";
import AppleTaskbar from "./AppleComponents/AppleTaskbar";
import Dialog from "./Dialog";

export default function Main() {
    const { theme } = useContext(ThemeContext);
    const [portfolioData, setPortfolioData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navBarHeight = useNavbarHeight();

    const [currentIframeUrl, setCurrentIframeUrl] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
              .from('Live-Projects')
              .select('*')
              .order('priority', { ascending: true });
            
            if (error) throw error;
            
            setPortfolioData(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    function handlePortfolioItemClick (url) {
        setCurrentIframeUrl(url);
        openDialog();
    };

    function openDialog() {
        setIsDialogOpen(true);
    }

    function closeDialog() {
        setIsDialogOpen(false);
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
                        <button onClick={() => handlePortfolioItemClick(data.url)} data-id={data.id} key={data.id} className="portfolio-img-wrapper">
                            <h2 className="visually-hidden">{data.name}</h2>
                            <img src={data.imgUrl} alt={data.name} />
                        </button>
                    ))}
                </div>
            </div>
            }
            <Dialog isDialogOpen={isDialogOpen} onDialogClose={closeDialog}>
                {currentIframeUrl && (
                <iframe
                    src={currentIframeUrl}
                    title="Portfolio Item"
                    height="100%"
                    width="100%"
                    frameBorder="0"
                ></iframe>
                )}
            </Dialog>

            {/* <dialog ref={dialogRef}>
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
            </dialog> */}
        </main>
    )
}