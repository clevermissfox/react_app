import { useEffect, useMemo, useState } from "react";
import PortfolioGridItem from "./PortfolioGridItem";

export default function PortfolioComponent({
  portfolioData = [],
  handlePortfolioItemClick,
  error,
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const normalizedItems = useMemo(() => {
    return portfolioData.map((item) => ({
      ...item,
      normalizedCategory: item.category?.trim().toLowerCase() || "",
    }));
  }, [portfolioData]);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        normalizedItems.map((item) => item.normalizedCategory).filter(Boolean),
      ),
    ];

    return ["all", ...uniqueCategories];
  }, [normalizedItems]);

  const filteredItems =
    activeCategory === "all"
      ? normalizedItems
      : normalizedItems.filter(
          (item) => item.normalizedCategory === activeCategory,
        );

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory("all");
    }
  }, [categories, activeCategory]);

  return (
    <>
      {error && <p className="error">Error: {error}</p>}

      <div
        role="tablist"
        aria-label="Portfolio Filters"
        className="filter-bar row gap-half fw-wrap"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className="btn btn-filter"
            onClick={() => setActiveCategory(category)}
          >
            {category === "all" ? "all portfolio projects" : category}
          </button>
        ))}
      </div>

      <div className="portfolio-grid-wrapper">
        <div className="portfolio-grid">
          {filteredItems.map((data) => (
            <PortfolioGridItem
              key={`${data.normalizedCategory}-${data.id}`}
              data={data}
              category={data.normalizedCategory}
              handleClick={handlePortfolioItemClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
