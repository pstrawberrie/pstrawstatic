import "./main.scss";

/**
 * Elements
 */
const navMain = document.querySelector("nav.nav-main");
const elements = {
  navMain,
  navToggle: navMain.querySelector("button.toggle"),
  navMenuTop: navMain.querySelector("ul.top"),
  navMenuSubToggles: navMain.querySelectorAll("button[data-nav-toggle]"),
};

/**
 * Util
 */
const TABLET_BP = 1024;

/**
 * Nav
 */
// Main menu
const isNavExpanded = () =>
  elements.navToggle.getAttribute("aria-expanded") === "true";

function toggleMobileNav(flag, disableAnimation) {
  const open = flag && flag === true;

  if (!disableAnimation) {
    elements.navToggle.classList.add("can-animate");
    elements.navMenuTop.classList.add("can-animate");
  }

  setTimeout(() => {
    elements.navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    elements.navMenuTop.setAttribute("aria-hidden", open ? "false" : "true");

    setTimeout(() => {
      elements.navToggle.classList.remove("can-animate");
      elements.navMenuTop.classList.remove("can-animate");
    }, 300);
  }, 0);
}

function onToggleClick() {
  if (isNavExpanded()) return toggleMobileNav(false);
  return toggleMobileNav(true);
}

/**
 * Resize
 */
let viewportWidth = window.innerWidth;
function onResize() {
  let direction;
  if (window.innerWidth > viewportWidth) direction = 1;
  if (window.innerWidth < viewportWidth) direction = 0;

  if (direction === 0 && window.innerWidth <= TABLET_BP && isNavExpanded)
    toggleMobileNav(false, true);

  if (direction === 1 && window.innerWidth > TABLET_BP)
    toggleMobileNav(true, true);

  viewportWidth = window.innerWidth;
}

/**
 * Listeners
 */
window.addEventListener("resize", onResize);
elements.navToggle.addEventListener("click", onToggleClick);

/**
 * On Load
 */
if (window.innerWidth > TABLET_BP) toggleMobileNav(true, true);
