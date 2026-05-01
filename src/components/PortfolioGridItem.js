import { useState } from "react";

export default function PortfolioGridItem({ data, category, handleClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const isGraphic = category === "graphic";
  const linkHref = data.external_url || null;
  const shouldRenderLink = Boolean(linkHref) && !isGraphic;

  return (
    <div className="portfolio-img-wrapper" data-id={`${category}-${data.id}`}>
      <button
        type="button"
        onClick={() => handleClick(data)}
        className="portfolio-img-button"
        aria-label={`Open ${data.name}`}
      >
        <h2 className="visually-hidden">{data.name}</h2>
        <img
          src={data.thumbnail_url}
          alt={data.name}
          onLoad={() => setImageLoaded(true)}
        />
      </button>

      {shouldRenderLink && imageLoaded && (
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-img-link"
          aria-label={`Open ${data.name} in new window`}
          title={`Open ${data.name} in new window`}
        >
          <i
            aria-hidden="true"
            className="fas fa-arrow-up-right-from-square"
          ></i>
        </a>
      )}
    </div>
  );
}
