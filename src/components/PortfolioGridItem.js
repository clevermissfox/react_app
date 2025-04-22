export default function PortfolioGridItem({ data, category, handleClick }) {
  const isLive = category === "live";
  const url = isLive ? data.url : data.videoUrl;
  return (
    <button
      type="button"
      onClick={() => handleClick(url)}
      data-id={`${category}-${data.id}`}
      className="portfolio-img-wrapper"
    >
      <h2 className="visually-hidden">{data.name}</h2>
      <img src={data.imgUrl} alt={data.name} />

      {/* {isLive && (
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className="portfolio-img-link"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open ${data.name} in new window`}
          title={`Open ${data.name} in new window`}
        />
      )} */}
    </button>
  );
}
