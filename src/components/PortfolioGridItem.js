import { useState } from "react";

export default function PortfolioGridItem({ data, category, handleClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isLive = category === "live";
  const isWebsiteWithLiveUrl = category === "websites" && data.liveUrl;
  const sourceURL = isLive ? data.url : data.videoUrl;
  const shouldRenderLink = isLive || isWebsiteWithLiveUrl;
  const linkHref = isLive ? data.url : data.liveUrl;

  return (
    <button
      type="button"
      onClick={() => handleClick(sourceURL)}
      data-id={`${category}-${data.id}`}
      className="portfolio-img-wrapper"
    >
      <h2 className="visually-hidden">{data.name}</h2>
      <img
        src={data.imgUrl}
        alt={data.name}
        onLoad={() => setImageLoaded(true)}
      />

      {shouldRenderLink && imageLoaded && (
        <a
          href={linkHref}
          target="_blank"
          rel="noreferrer"
          className="portfolio-img-link"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open ${data.name} in new window`}
          title={`Open ${data.name} in new window`}
        />
      )}
    </button>
  );
}
