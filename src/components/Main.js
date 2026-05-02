import { useContext, useState, useEffect, useCallback } from "react";
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
  const [portfolioData, setPortfolioData] = useState([]);
  const [error, setError] = useState(null);
  const [portfolioItemWindows, setPortfolioItemWindows] = useState({});
  const { dialogs, openDialog, toggleMinimizeDialog } = useDialog();
  const [isCalendlyScriptLoaded, setIsCalendlyScriptLoaded] = useState(false);

  const { dialogId } = useParams();
  // const navigate = useNavigate();

  // set navbar height for css
  useNavBarHeight();
  // set the top position of taskbar on apple theme for dialog calculations
  useTaskBarOffset();

  const sourceURLs = [
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
  ];

  const isCalendarDialogOpen = dialogs["calendar"]?.isOpen || false;

  useEffect(() => {
    if (!isCalendarDialogOpen || isCalendlyScriptLoaded) return;

    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );

    if (existingScript) {
      setIsCalendlyScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        setIsCalendlyScriptLoaded(true);
      }, 100);
    };

    document.body.appendChild(script);
  }, [isCalendarDialogOpen, isCalendlyScriptLoaded]);

  // get the portfolio data from supabase
  const fetchPortfolioData = useCallback(async () => {
    // setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("inactive", false)
        .order("priority", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to load portfolio items.");
        console.error("Error fetching portfolio items:", error.message);
        return;
      }
      console.log("portfolio_items:", data);
      setPortfolioData(data ?? []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    } finally {
      openDialog("portfolio");
    }
  }, [openDialog]);

  function handlePortfolioItemClick(item) {
    const dialogId = `portfolio-item-${item.id}`;

    setPortfolioItemWindows((prev) => ({
      ...prev,
      [dialogId]: item,
    }));

    const dialog = dialogs[dialogId];
    if (!dialog?.isOpen) {
      openDialog(dialogId, { parentAppId: "portfolio" });
    } else if (dialog.isMinimized) {
      toggleMinimizeDialog(dialogId);
    }
  }

  const appIcons = ApplicationData({ theme, fetchPortfolioData });

  useEffect(() => {
    if (dialogId) {
      openDialog(dialogId);
      if (dialogId === "portfolio") {
        // Check if it's the portfolio dialog
        fetchPortfolioData();
      }
    }
  }, [dialogId, openDialog, fetchPortfolioData]);

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
          </Dialog>

          {Object.entries(portfolioItemWindows).map(([dialogId, item]) => (
            <Dialog key={dialogId} id={dialogId} parentAppId="portfolio">
              {dialogs[dialogId]?.isOpen &&
                (item.category === "graphic" ? (
                  <div className="portfolio-preview-image-wrapper">
                    <img
                      src={item.thumbnail_url}
                      alt={item.name}
                      className="portfolio-preview-image"
                    />
                  </div>
                ) : item.iframe_url ? (
                  <iframe
                    src={item.iframe_url}
                    loading="lazy"
                    title={item.name || "Portfolio Item"}
                    height="100%"
                    width="100%"
                  ></iframe>
                ) : null)}
            </Dialog>
          ))}

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
