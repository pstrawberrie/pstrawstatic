/**
 * Nav Partial
 */
const SITE = require("../../../config");
const { getPages } = require("../../scripts/fs");

const navLinks = () => {
  const pages = getPages(["test"]);

  // Ensure 'home' is first link
  if (pages.indexOf("home") > -1) {
    pages.splice(pages.indexOf("home"), 1);
    pages.splice(0, 0, "home");
  }

  // Ensure 'about' is last link
  if (pages.indexOf("about") > -1) {
    pages.splice(pages.indexOf("about"), 1);
    pages.splice(pages.length, 0, "about");
  }

  // Create link html
  return pages.map((page) => {
    const pageName = page === "home" ? SITE.TITLE : page;
    return `<li><a href="${page}.html">${pageName}</a></li>`;
  });
};

module.exports = `
  <nav class="nav-main">
    <button aria-expanded="false" class="toggle">
      <span class="l1"></span>
      <span class="l2"></span>
      <span class="l3"></span>
    </button>
    <ul class="top" aria-hidden="true">
      ${navLinks().join("")}
    </ul>
  </nav>
`;
