import CONSTANTS from "./scripts/constants";
import "./main.scss";

/**
 * Elements
 */
const navMain = document.querySelector("nav.nav-main");
const elements = {
  navMain,
  navLinks: navMain.getElementsByTagName("a"),
  navToggle: navMain.querySelector("button.toggle"),
  navMenuTop: navMain.querySelector("ul.top"),
  navMenuSubToggles: navMain.querySelectorAll("button[data-nav-toggle]"),
  modals: document.querySelectorAll(".modal[data-modal]"),
  modalTriggers: document.querySelectorAll("[data-modal-trigger]"),
};

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

  [...elements.navLinks].map((el) => {
    el[flag ? "removeAttribute" : "setAttribute"]("z-index", "-1");
    el[flag ? "removeAttribute" : "setAttribute"]("tabindex", "-1");
  });

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

// Resize
let viewportWidth = window.innerWidth;
function onResize() {
  let direction;
  if (window.innerWidth > viewportWidth) direction = 1;
  if (window.innerWidth < viewportWidth) direction = 0;

  if (
    direction === 0 &&
    window.innerWidth <= CONSTANTS.BREAKPOINTS.TABLET &&
    isNavExpanded
  )
    toggleMobileNav(false, true);

  if (direction === 1 && window.innerWidth > CONSTANTS.BREAKPOINTS.TABLET)
    toggleMobileNav(true, true);

  viewportWidth = window.innerWidth;
}

/**
 * Modals
 */
function toggleModal(flag, modal) {
  if (!modal) return;
  const modalEle = document.querySelector(`[data-modal="${modal}"]`);
  const modalTriggerEle = document.querySelector(
    `[data-modal-trigger="${modal}"]`
  );

  if (modalEle && modalTriggerEle) {
    modalEle.setAttribute("aria-hidden", flag ? "false" : "true");
    modalEle[flag ? "setAttribute" : "removeAttribute"]("open", "");
    modalTriggerEle.setAttribute("aria-expanded", flag ? "true" : "false");
  }
}

function onModalClick(event) {
  const { target } = event;
  const isCloseButton = target.classList.contains("modal__close");
  let modalName = target.dataset.modal;
  if (!modalName && isCloseButton)
    modalName = target.closest("[data-modal]").dataset.modal;

  if (isCloseButton || !target.closest(".modal__content"))
    toggleModal(false, modalName);
}

function onModalTriggerClick(event) {
  const {type, code } = event;
  if(type === 'keyup' && code && code !== 'Enter' && code !== 'Space') return;

  const { dataset } = event.target;
  const modalName = dataset.modalTrigger;
  const modalEle = document.querySelector(`[data-modal="${modalName}"]`);

  if (modalEle) toggleModal(true, modalName);
}

/**
 * Document Keyups
 */
function onDocumentKeyup(event) {
  const { code } = event;
  if(!code) return;

  if(code === 'Escape') {
    const openModalEl = document.querySelector('[data-modal][aria-hidden="false"]');
    if(openModalEl) toggleModal(false, openModalEl.getAttribute('data-modal'));
    if(isNavExpanded()) toggleMobileNav(false);
  }
}

/**
 * Listeners
 */
function addListeners() {
  window.addEventListener("resize", onResize);
  elements.navToggle.addEventListener("click", onToggleClick);
  [...elements.modals].map((el) => el.addEventListener("click", onModalClick));
  [...elements.modalTriggers].map((el) => {
      el.addEventListener("click", onModalTriggerClick);
      el.addEventListener("keyup", onModalTriggerClick);
    }
  );
  document.addEventListener("keyup", onDocumentKeyup);
}

/**
 * On Load
 */
function onLoad() {
  // Nav Toggles on Load
  toggleMobileNav(window.innerWidth > CONSTANTS.BREAKPOINTS.TABLET ? true : false, true);
}

/**
 * Kick it!
 */
document.addEventListener('DOMContentLoaded', () => {
  addListeners();
  onLoad();
});
