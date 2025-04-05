import { useEffect, useState } from "react";
import ResumeData from "./ResumeData";
import ResumeIconsSprite from "./ResumeIconsSprite";
import LogoItem from "./LogoItem";

export default function ResumeWrapper() {
  const [activeCat, setActiveCat] = useState("Design");
  const [selectedItem, setSelectedItem] = useState(null);
  const [contentHeading, setContentHeading] = useState("");
  const [contentPara, setContentPara] = useState("LOADING...");

  const filteredData = ResumeData().filter(
    (item) => item.category.toLowerCase() === activeCat.toLowerCase()
  );

  useEffect(() => {
    const firstItem = filteredData[0];
    if (firstItem) {
      setSelectedItem(firstItem.id);
      setContentHeading(firstItem.name);
      setContentPara(firstItem.description);
    }
  }, [filteredData]);

  const handleTabClick = (category) => {
    setActiveCat(category);

    // Automatically select the first item in the filtered data
    const firstItem = ResumeData().find(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );

    if (firstItem) {
      setSelectedItem(firstItem.id);
      setContentHeading(firstItem.name);
      setContentPara(firstItem.description);
    } else {
      // Handle empty categories
      setSelectedItem(null);
      setContentHeading("");
      setContentPara("Please select an item to see more details.");
    }
  };

  const handleLogoClick = (item) => {
    setSelectedItem(item.id);
    setContentHeading(item.name);
    setContentPara(item.description);
    console.log(item);
  };

  return (
    <div className="resume-wrapper">
      <header className="padding-b-1">
        <nav className="wrapper">
          <ul
            role="tablist"
            className="tablist row ai-cen gap-1 fw-wrap"
            aria-label="Resume Tabs"
          >
            {["Design", "Development", "Tools"].map((category) => (
              <li key={category} role="presentation">
                <button
                  role="tab"
                  aria-selected={activeCat === category}
                  className="tab"
                  onClick={() => handleTabClick(category)}
                  aria-controls="panel"
                >
                  {category}
                </button>
              </li>
            ))}
            {/* <li role="presentation">
              <button
                id="tab-design"
                role="tab"
                aria-controls="panel"
                aria-selected={activeCat === 'Design'}
                className="tab"
                data-category="Design"
                onClick={updateactiveCat}
              >
                Design
              </button>
            </li>
            <li role="presentation">
              <button
                id="tab2"
                role="tab"
                aria-controls="panel"
                aria-selected={activeCat === 'Development'}
                className="tab"
                data-category="Development"
                onClick={updateactiveCat}
              >
                Development
              </button>
            </li>
            <li role="presentation">
              <button
                id="tab3"
                role="tab"
                aria-controls="panel"
                aria-selected={activeCat === 'Tools'}
                className="tab"
                onClick={updateactiveCat}
              >
                Tools
              </button>
            </li> */}
          </ul>
        </nav>
      </header>
      <div className="wrapper">
        <section
          id="panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeCat.toLowerCase()}`}
          className="tabpanel"
        >
          <div className="content-column">
            <h2 className="ls-1 uppercase thin">{contentHeading}</h2>
            <p className="margin-bs-quarter">{contentPara}</p>
          </div>
          <div className="icon-grid container">
            <ul className="logo-list" role="listbox">
              {filteredData.length === 0 ? (
                <p>Please choose another category. There is nothing here.</p>
              ) : (
                filteredData.map((item, index) => (
                  <LogoItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItem === item.id}
                    isFirst={index === 0}
                    onClick={handleLogoClick}
                  />
                ))
              )}
            </ul>
          </div>
        </section>
      </div>
      <ResumeIconsSprite />
    </div>
  );
}
