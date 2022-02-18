/**
 * Nav Partial
 */
const SITE = require("../../../config");
const { getPages } = require("../../scripts/fs");

const navLinks = () => {
  const pages = getPages(["test"]);
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
