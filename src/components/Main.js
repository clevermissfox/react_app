import { useContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavBarHeight } from "../hooks/useNavBarHeight";
import ThemeContext from "../context/ThemeContext";
import { supabase } from "../config/supabase-config";
import AppleTaskbar from "./AppleComponents/AppleTaskbar";
import Dialog from "./Dialog";
import MicrosoftDesktop from "./MicrosoftComponents/MicrosoftDesktop";
import ApplicationData from "./ApplicationData";

export default function Main() {
  const { theme } = useContext(ThemeContext);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dialogCalRef = useRef();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentIframeUrl, setCurrentIframeUrl] = useState(null);
  const [error, setError] = useState(null);

  // set navbar height for css
  useNavBarHeight();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Live-Projects")
        .select("*")
        .order("priority", { ascending: true });

      if (error) throw error;

      setPortfolioData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function handlePortfolioItemClick(url) {
    setCurrentIframeUrl(url);
    openDialog();
  }

  function openDialog() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setCurrentIframeUrl(null);
  }

  const appIcons = ApplicationData({ theme, fetchData, dialogCalRef });

  return (
    <>
      <main className="main">
        {theme === "apple" && <AppleTaskbar appIcons={appIcons} />}
        {theme === "microsoft" && (
          <>
            <MicrosoftDesktop appIcons={appIcons} />
          </>
        )}
        {/* <button onClick={fetchData} disabled={isLoading || portfolioData}>
        {isLoading
          ? "Loading..."
          : portfolioData
          ? "Portfolio Data has been fetched"
          : "Fetch Portfolio Items"}
      </button> */}
        {error && <p className="error">Error: {error}</p>}
        {portfolioData && (
          <div className="portfolio-grid-wrapper">
            <div className="portfolio-grid">
              {portfolioData.map((data) => (
                <button
                  onClick={() => handlePortfolioItemClick(data.url)}
                  data-id={data.id}
                  key={data.id}
                  className="portfolio-img-wrapper"
                >
                  <h2 className="visually-hidden">{data.name}</h2>
                  <img src={data.imgUrl} alt={data.name} />
                </button>
              ))}
            </div>
          </div>
        )}
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
        <dialog ref={dialogCalRef} className="dialog-cal">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/edicodesigner/freeconsultation?hide_event_type_details=1&background_color=000&text_color=ffffff&primary_color=a588ca"
            style={{ minWidth: "320px", height: "100%" }}
          >
            <button
              btn-close=""
              onClick={() => dialogCalRef.current?.close()}
              aria-label="Close Calendar"
            >
              <i className="fa fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
        </dialog>
      </main>
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </>
  );
}
