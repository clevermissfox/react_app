import MicrosoftButtonApplication from "./MicrosoftButtonApplication";

export default function MicrosoftDesktop({ appIcons }) {
  return (
    <div className="microsoft-desktop">
      {appIcons.map(
        (icon) =>
          !icon.isAppleOnly && (
            <MicrosoftButtonApplication
              key={icon.name}
              classes={icon.classes}
              dataName={icon.name}
              imgSrc={icon.imgSrc}
              imgClasses={icon.imgClasses}
              handleClick={icon.handleClick}
              disabled={icon.disabled ? icon.disabled : false}
            />
          )
      )}

      {/*
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

      <button
        className="calendar wind-desktop-btn"
        onClick={() => dialogCalRef.current.show()}
      >
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
            alt=""
          />
        </div>
        <p className="small">Contact</p>
      </button> */}
      {/* <dialog ref={dialogCalRef} className="dialog-cal">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/edicodesigner/freeconsultation?hide_event_type_details=1&background_color=000&text_color=ffffff&primary_color=a588ca"
          style={{ minWidth: "320px", height: "700px" }}
        >
          <button
            btn-close=""
            onClick={() => dialogCalRef.current.close()}
            aria-label="Close Calendar"
          >
            <i class="fa fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
      </dialog> */}
    </div>
  );
}
