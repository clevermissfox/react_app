import { useContext, useState, useEffect, useCallback } from "react";
import ThemeContext from "../context/ThemeContext";
import { useDialog } from "../context/DialogContext";
import { useNavBarHeight } from "../hooks/useNavBarHeight";

import { supabase } from "../config/supabase-config";

import AppleTaskbar from "./AppleComponents/AppleTaskbar";
import Dialog from "./Dialog";
import MicrosoftDesktop from "./MicrosoftComponents/MicrosoftDesktop";
import ApplicationData from "./ApplicationData";
import ResumeWrapper from "./ResumeWrapper";

export default function Main() {
  const { theme } = useContext(ThemeContext);
  const [portfolioData, setPortfolioData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const { dialogs, openDialog } = useDialog();

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

  // get the portfolio data from supabase
  const fetchPortfolioData = useCallback(async () => {
    // setIsLoading(true);
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
      openDialog("portfolio");
    }
  }, []);

  // Handle portfolio item click to open dialog and load iframe URL
  function handlePortfolioItemClick(url) {
    setCurrentIframeUrl(url); // Set iframe URL dynamically
    if (dialogs["portfolio-item"]) {
      openDialog("portfolio-item"); // Open portfolio dialog via context
    }
  }

  const isPortfolioDialogOpen = dialogs["portfolio-item"]?.isOpen || false;

  useEffect(() => {
    if (!isPortfolioDialogOpen) {
      setCurrentIframeUrl(null); // Reset iframe URL when portfolio dialog closes
    }
  }, [isPortfolioDialogOpen]); // Simplified dependency array

  const appIcons = ApplicationData({ theme, fetchPortfolioData });

  return (
    <>
      <main className="main">
        {theme === "microsoft" && (
          <>
            <MicrosoftDesktop appIcons={appIcons} />
          </>
        )}
        {portfolioData && (
          <Dialog id="portfolio">
            {error && <p className="error">Error: {error}</p>}
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
          </Dialog>
        )}

        {currentIframeUrl && (
          <Dialog id="portfolio-item">
            <iframe
              src={currentIframeUrl}
              title="Portfolio Item"
              height="100%"
              width="100%"
              frameBorder="0"
            ></iframe>
          </Dialog>
        )}
        <Dialog id="calendar" classes="dialog-cal">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/edicodesigner/freeconsultation?hide_event_type_details=1&background_color=000&text_color=ffffff&primary_color=a588ca"
            style={{ minWidth: "320px", height: "100%" }}
          ></div>
        </Dialog>
        <Dialog id="resume">
          <ResumeWrapper />
        </Dialog>
      </main>
      <footer>
        {theme === "apple" && <AppleTaskbar appIcons={appIcons} />}
      </footer>
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </>
  );
}
