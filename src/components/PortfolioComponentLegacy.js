import { useState } from "react";
import PortfolioGridItem from "./PortfolioGridItem";

export default function PortfolioComponent({
  portfolioData,
  handlePortfolioItemClick,
  error,
}) {
  const [activeCategory, setActiveCategory] = useState(
    "all portfolio projects"
  );
  const categories = ["all portfolio projects", ...Object.keys(portfolioData)];

  return (
    <>
      {(error || !portfolioData) && <p className="error">Error: {error}</p>}
      {portfolioData && (
        <>
          <div
            role="tablist"
            aria-label="Portfolio Filters"
            className="filter-bar row gap-half fw-wrap"
          >
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                className="btn btn-filter"
                onClick={() => setActiveCategory(category)}
              >
                {category === "live" ? "coded projects" : category}
              </button>
            ))}
          </div>
          <div className="portfolio-grid-wrapper">
            <div className="portfolio-grid">
              {Object.entries(portfolioData)
                .filter(
                  ([category]) =>
                    activeCategory === "all portfolio projects" ||
                    activeCategory === category
                )
                .flatMap(([category, items]) =>
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
        </>
      )}
    </>
  );
}
