/**
 * FS Utils (non-DOM usage)
 */
const fs = require("fs");

// Get Pages
exports.getPages = () => {
  const excludedPages = ["partials"];
  const pages = [];

  fs.readdirSync("./src/pages/").forEach((file) => {
    if (excludedPages.indexOf(file) === -1) pages.push(file);
  });

  return pages;
};

// Get Nice Page Name
exports.getNicePageName = (str) =>
  str
    .toLowerCase()
    .replace(/(^| )(\w)/g, (s) => s.toUpperCase())
    .replace(/-/g, " ");
