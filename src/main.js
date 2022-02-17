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

// Submenus
// function isSubMenuExpanded(name) {
//   if (name) {
//     const ele = navMain.querySelector(`[data-nav-menu="${name}"]`);
//     if (ele && ele.getAttribute("aria-hidden") === "false") return true;
//   }

//   return false;
// }

// function toggleSubMenu(name) {
//   if (name) {
//     const isExpanded = isSubMenuExpanded();
//     const toggleEle = navMain.querySelector(`[data-nav-toggle="${name}"]`);
//     const menuEle = navMain.querySelector(`[data-nav-menu="${name}"]`);

//     if (toggleEle && menuEle) {
//       const menuLinks = menuEle.getElementsByTagName("a");

//       toggleEle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
//       menuEle.setAttribute("aria-hidden", isExpanded ? "true" : "false");

//       [...menuLinks].map((linkEle) =>
//         linkEle.setAttribute("tabindex", isExpanded ? "-1" : "0")
//       );
//     }
//   }
// }

// function onSubToggleFocus(e) {
//   const menuName = e.target.dataset.navToggle;
//   toggleSubMenu(menuName);
// }

// function onSubToggleBlur(e) {
//   const menuName = e.target.dataset.navToggle;
//   toggleSubMenu(menuName);
// }

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
  console.log("tap"); //REMOVE
}

/**
 * Listeners
 */
window.addEventListener("resize", onResize);
elements.navToggle.addEventListener("click", onToggleClick);
// [...elements.navMenuSubToggles].map((ele) => {
//   ele.addEventListener("focus", onSubToggleFocus);
//   ele.addEventListener("blur", onSubToggleBlur);
// });

/**
 * On Load
 */
if (window.innerWidth > TABLET_BP) toggleMobileNav(true, true);
