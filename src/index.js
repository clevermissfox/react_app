import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// setTimeout(() => {
//   const themeToggle = document.querySelector(".theme-toggle");
//   const toggleStyles = getComputedStyle(themeToggle).height;
//   console.log(toggleStyles);

//   // const firstSibling = document.querySelector(".theme-img-wrapper-apple");
//   // const secondSibling = document.querySelector(".theme-img-wrapper-microsoft");

//   // const firstRect = firstSibling.getBoundingClientRect();
//   // const secondRect = secondSibling.getBoundingClientRect();

//   // const distance = secondRect.left - firstRect.right;

//   // console.log(
//   //   "Distance between the right edge of the first sibling and the left edge of the second sibling:",
//   //   distance
//   // );
// }, 1000);
