/**
 * FS Utils (non-DOM usage)
 */
const fs = require("fs");

// Get Pages
exports.getPages = (excludeArr) => {
  const excludedPages =
    excludeArr && typeof excludeArr === "object" && excludeArr.length > 0
      ? ["partials", ...excludeArr]
      : ["partials"];
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

// Get Pages Entry Object
exports.getPagesEntryObject = () => {
  const pageObjs = this.getPages().map((page) => {
    return [page, `./src/pages/${page}/${page}.js`];
  });

  return Object.fromEntries([...pageObjs]);
};
