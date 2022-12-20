/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

let navigation = [];
let navigationTimer;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description collects all sections of page
 * @returns {Array.<object>} list of sections
 */
function getNavSections() {
  const navSections = [];

  for (section of document.getElementsByTagName("section")) {
    if (section.dataset.nav) {
      navSections.push(section);
    }
  }

  return navSections;
}

/**
 * @description builds a DocumentFragment with a list of all section-links
 * @returns {DocumentFragment} contains li elements reflecting all page sections
 */
function buildLinkFragment(navSections) {
  const linkFrag = new DocumentFragment();

  navSections.forEach((section) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.dataset.linkId = section.getAttribute("id");
    a.textContent = section.dataset.nav;
    a.classList.add("menu__link");

    li.appendChild(a);
    linkFrag.appendChild(li);

    navigation.push({ section, li });
  });

  return linkFrag;
}

/**
 * @description checks which section is currently viewed (near top of viewport) and sets it to active
 */
function toggleActiveSection() {
  navigation.forEach((navItem) => {
    const box = navItem.section.getBoundingClientRect();

    if (box.top <= 200 && box.bottom >= 200) {
      navItem.section.classList.add("active");
      navItem.li.classList.add("active-nav");
    } else {
      navItem.section.classList.remove("active");
      navItem.li.classList.remove("active-nav");
    }
  });
}

/**
 * @description shows or hides page-up button depending on current scroll
 * @param {boolean} show
 */
function togglePageUpVisibility(show) {
  if (show) {
    document.querySelector(".page__button-up").classList.remove("hidden");
  } else {
    document.querySelector(".page__button-up").classList.add("hidden");
  }
}

/**
 * @description shows header while scrolling, hides it afterwards
 */
function toggleHeaderVisibility() {
  const header = document.querySelector(".page__header");
  header.classList.remove("hidden");

  //clearTimeout to avoid timmer is already running down while still scrolling
  if (navigationTimer) {
    clearTimeout(navigationTimer);
  }

  navigationTimer = setTimeout(() => {
    header.classList.add("hidden");
  }, 1000);
}

/**
 * @description scrolls to top of page
 */
function scrollTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

/**
 * @description collapses or expands the content of a section
 * @param {MouseEvent} event
 */
function togglecollapsible(event) {
  if (!event.target.classList.contains("collapsible-icon")) return;

  const collapsibleElem = event.target.closest(".landing__container");

  for (paragraph of collapsibleElem.querySelectorAll("p")) {
    if (collapsibleElem.parentElement.classList.contains("expanded")) {
      paragraph.classList.add("hidden");
    } else {
      paragraph.classList.remove("hidden");
    }
  }

  event.target
    .closest(".landing__container")
    .parentElement.classList.toggle("expanded");
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * @description builds the navigation and adds it to the dom
 */
function buildNavigation() {
  const navSections = getNavSections();
  const linkFrag = buildLinkFragment(navSections);
  const navBar = document.querySelector("#navbar__list");

  navBar.addEventListener("click", onNavBarClick);
  navBar.appendChild(linkFrag);
}

/**
 * @description toggles elements based on current scroll
 */
function doScrollAdjustments() {
  toggleActiveSection();
  togglePageUpVisibility(window.pageYOffset > window.innerHeight);
  toggleHeaderVisibility();
}

/**
 * End Main Functions
 * Begin Events
 *
 */

/**
 * @description builds the navigation and adds eventListeners
 * @param {Event} event
 */
document.addEventListener("DOMContentLoaded", (event) => {
  buildNavigation();

  document
    .querySelector(".page__button-up")
    .addEventListener("click", scrollTop);

  // Set sections as active
  document.addEventListener("scroll", doScrollAdjustments);

  document.querySelector("main").addEventListener("click", togglecollapsible);
});

/**
 * @description smooth-scrolls to related section (click-event)
 * @param {MouseEvent} event
 */
function onNavBarClick(event) {
  if (event.target.tagName == "A") {
    event.preventDefault();

    document
      .getElementById(event.target.dataset.linkId)
      .scrollIntoView({ behavior: "smooth" });
  }
}
