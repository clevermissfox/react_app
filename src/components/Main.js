import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ThemeContext from "../context/ThemeContext";
import { useDialog } from "../context/DialogContext";
import { useNavBarHeight } from "../hooks/useNavBarHeight";
import { useTaskBarOffset } from "../hooks/useTaskBarOffset";

import { supabase } from "../config/supabase-config";

import AppleTaskbar from "./AppleComponents/AppleTaskbar";
import Dialog from "./Dialog";
import MicrosoftDesktop from "./MicrosoftComponents/MicrosoftDesktop";
import ApplicationData from "./ApplicationData";
import ResumeWrapper from "./ResumeWrapper";
import PortfolioComponent from "./PortfolioComponent";
import NavBar from "./NavBar";

export default function Main() {
  const { theme } = useContext(ThemeContext);
  const [portfolioData, setPortfolioData] = useState({
    live: [],
    websites: [],
    // graphics: [], // Uncomment if you have graphics data; will have to handle the handlePortfolioItemClick function since it doesnt have an iframe to load
  });
  const [error, setError] = useState(null);
  const [currentIframeUrl, setCurrentIframeUrl] = useState(null);
  const { dialogs, openDialog, toggleMinimizeDialog } = useDialog();
  const [sourceURLs, setSourceURLs] = useState([]);
  const [isCalendlyScriptLoaded, setIsCalendlyScriptLoaded] = useState(false);

  const { dialogId } = useParams();
  // const navigate = useNavigate();

  // set navbar height for css
  useNavBarHeight();
  // set the top position of taskbar on apple theme for dialog calculations
  useTaskBarOffset();

  useEffect(() => {
    // Initialize source URLs for dialogs
    setSourceURLs([
      {
        dialogID: "portfolio-item",
        url: currentIframeUrl || "",
      },
      {
        dialogID: "contact",
        url: "https://edicodesigns.com/connect",
      },
      {
        dialogID: "browser",
        url: "https://edicodesigns.com",
      },
      {
        dialogID: "quote",
        url: "https://edicodesigns.com/quote",
      },
      {
        dialogID: "calendar",
        url: "https://calendly.com/edicodesigns/freeconsultation?hide_event_type_details=1&background_color=000&text_color=ffffff&primary_color=a588ca",
      },
    ]);
  }, [currentIframeUrl]);

  useEffect(() => {
    if (dialogs["calendar"]?.isOpen && !isCalendlyScriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;

      script.onload = () => {
        setTimeout(() => {
          setIsCalendlyScriptLoaded(true);
        }, 100); // Slight delay
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        setIsCalendlyScriptLoaded(false);
      };
    }
  }, [dialogs["calendar"]?.isOpen, dialogs, isCalendlyScriptLoaded]);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://assets.calendly.com/assets/external/widget.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // get the portfolio data from supabase
  // const fetchPortfolioData = useCallback(async () => {
  //   // setIsLoading(true);
  //   setError(null);
  //   try {
  //     const { data, error } = await supabase
  //       .from("Live-Projects")
  //       .select("*")
  //       .order("priority", { ascending: true });

  //     if (error) throw error;

  //     setPortfolioData(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //     setError(error.message);
  //   } finally {
  //     openDialog("portfolio");
  //     console.log(portfolioData);
  //   }
  // }, []);

  const fetchPortfolioData = async () => {
    const tables = [
      { key: "live", name: "Live-Projects", hasInactive: true },
      { key: "websites", name: "Websites", hasInactive: false },
      // { key: "graphics", name: "Graphics", hasInactive: false }, // uncomment if you have graphics data
    ];

    const results = {};
    let successCount = 0;

    try {
      for (const { key, name, hasInactive } of tables) {
        let query = supabase.from(name).select("*");

        if (hasInactive) {
          query = query.eq("inactive", false);
        }

        query = query.order("priority", { ascending: true });

        const { data, error } = await query;

        if (!error && data?.length > 0) {
          results[key] = data;
          successCount++;
        }
      }

      if (successCount === 0) {
        setError("Failed to load portfolio items.");
      } else {
        setError(null);
        setPortfolioData(results);
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      openDialog("portfolio");
    }
  };

  // Handle portfolio item click to open dialog and load iframe URL
  function handlePortfolioItemClick(url) {
    setCurrentIframeUrl(url);
    const dialog = dialogs["portfolio-item"];
    if (!dialog?.isOpen) {
      openDialog("portfolio-item");
    } else if (dialog.isMinimized) {
      toggleMinimizeDialog("portfolio-item");
    }
  }
  const isPortfolioDialogOpen = dialogs["portfolio-item"]?.isOpen || false;

  useEffect(() => {
    if (!isPortfolioDialogOpen) {
      setCurrentIframeUrl(null); // Reset iframe URL when portfolio dialog closes
    }
  }, [isPortfolioDialogOpen]); // Simplified dependency array

  const appIcons = ApplicationData({ theme, fetchPortfolioData });

  useEffect(() => {
    if (dialogId) {
      openDialog(dialogId);
      console.log(dialogId);
      if (dialogId === "portfolio") {
        // Check if it's the portfolio dialog
        fetchPortfolioData();
      }
    }
  }, [dialogId]);

  return (
    <>
      <div className="App">
        <NavBar appIcons={appIcons} fetchPortfolioData={fetchPortfolioData} />

        <main className="main">
          {theme === "microsoft" && (
            <>
              <MicrosoftDesktop appIcons={appIcons} />
            </>
          )}
          <Dialog id="portfolio">
            <PortfolioComponent
              portfolioData={portfolioData}
              error={error}
              handlePortfolioItemClick={handlePortfolioItemClick}
            />
            {/* {(error || !portfolioData) && <p className="error">Error: {error}</p>}
          {portfolioData && (
            <div className="portfolio-grid-wrapper">
              <div className="portfolio-grid">
                 {portfolioData.map((data) => (
                  <button
                    type="button"
                    onClick={() => handlePortfolioItemClick(data.url)}
                    data-id={data.id}
                    key={data.id}
                    className="portfolio-img-wrapper"
                  >
                    <h2 className="visually-hidden">{data.name}</h2>
                    <img src={data.imgUrl} alt={data.name} />
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noreferrer"
                      className="portfolio-img-link"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Open ${data.name} in new window`}
                      title={`Open ${data.name} in new window`}
                    >

                    </a>
                  </button>
                ))}
                {Object.entries(portfolioData).map(([category, items]) =>
                  items.map((data) => (
                    <PortfolioGridItem
                      key={`${category}-${data.id}`}
                      data={data}
                      category={category}
                      handleClick={handlePortfolioItemClick}
                    />
                  ))
                )}
              </div>
            </div>
          )} */}
          </Dialog>

          <Dialog id="portfolio-item">
            {dialogs["portfolio-item"]?.isOpen && (
              <iframe
                src={
                  sourceURLs.find((x) => x.dialogID === "portfolio-item")
                    ?.url || currentIframeUrl
                }
                loading="lazy"
                title="Portfolio Item"
                height="100%"
                width="100%"
              ></iframe>
            )}
          </Dialog>

          <Dialog id="calendar" classes="dialog-cal">
            <div
              className="calendly-inline-widget"
              data-url={
                dialogs["calendar"]?.isOpen // Set data-url only if the dialog is open
                  ? sourceURLs.find((x) => x.dialogID === "calendar")?.url || ""
                  : null // Null for data-url when the dialog is closed
              }
              style={{ minWidth: "320px", height: "100%" }}
            ></div>
          </Dialog>
          <Dialog id="resume">
            <ResumeWrapper />
          </Dialog>

          <Dialog id="browser">
            {dialogs["browser"]?.isOpen && (
              <iframe
                src={
                  sourceURLs.find((x) => x.dialogID === "browser")?.url || ""
                }
                loading="lazy"
                title="Browser"
                height="100%"
                width="100%"
              ></iframe>
            )}
          </Dialog>
          <Dialog id="contact">
            {dialogs["contact"]?.isOpen && (
              <iframe
                src={
                  sourceURLs.find((x) => x.dialogID === "contact")?.url || ""
                }
                loading="lazy"
                title="Contact Form"
                height="100%"
                width="100%"
              ></iframe>
            )}
          </Dialog>
          <Dialog id="quote">
            {dialogs["quote"]?.isOpen && (
              <iframe
                src={sourceURLs.find((x) => x.dialogID === "quote")?.url || ""}
                loading="lazy"
                title="Request a Quote"
                height="100%"
                width="100%"
              ></iframe>
            )}
          </Dialog>
          <Dialog id="trash">
            <h2 className="ta-cen invert padding-1">
              The trash button is just for decoration 🗑️
            </h2>
          </Dialog>
        </main>

        {theme === "apple" && (
          <footer className="footer">
            <AppleTaskbar appIcons={appIcons} />{" "}
          </footer>
        )}
      </div>
    </>
  );
}
