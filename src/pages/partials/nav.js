/**
 * Nav Partial
 */
const SITE = require("../../../config");

module.exports = `
  <nav class="nav-main">
    <button aria-expanded="false" class="toggle">
      <span class="l1"></span>
      <span class="l2"></span>
      <span class="l3"></span>
    </button>
    <ul class="top" aria-hidden="true">
      <li class="logo"><a href="home.html">${SITE.TITLE}</a></li>
      <li><a href="notes.html">notes</a></li>
      <li><a href="about.html">about</a></li>
    </ul>
  </nav>
`;
