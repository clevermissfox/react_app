export default function MicrosoftDesktop() {
  return (
    <div class="microsoft-desktop">
      <button className="folder wind-desktop-btn">
        <div className="wind-desktop-icon">
          <img
            src="/assets/images/image-icons/img-windows_gallery.png"
            alt=""
          />
        </div>
        <p className="small">Portfolio</p>
      </button>

      <button className="resume wind-desktop-btn">
        <div className="wind-desktop-icon">
          <img
            src="/assets/images/image-icons/img-windows_pdf.png"
            alt="pdf-icon"
          />
        </div>
        <p className="small">Resume</p>
      </button>

      <button className="calendar wind-desktop-btn">
        <div className="wind-desktop-icon">
          <img
            src="/assets/images/image-icons/img-windows_calendar.png"
            alt="calendar"
          />
        </div>
        <p className="small">Calendar</p>
      </button>

      <button className="quote wind-desktop-btn">
        <div className="wind-desktop-icon">
          <img
            src="/assets/images/image-icons/img-windows_paper-airplane.png"
            alt="paper-plane"
          />
        </div>
        <p className="small">Request a Quote</p>
      </button>

      <button className="browse wind-desktop-btn">
        <div className="wind-desktop-icon">
          <img
            src="/assets/icons/microsoft/icon-windows_chrome-logo.svg"
            alt="pdf-icon"
          />
        </div>
        <p className="small">Browse</p>
      </button>

      <button className="contact wind-desktop-btn">
        <div className="wind-desktop-icon">
          <img
            src="/assets/images/image-icons/img-windows_envelope.png"
            alt="pdf-icon"
          />
        </div>
        <p className="small">Contact</p>
      </button>
    </div>
  );
}
