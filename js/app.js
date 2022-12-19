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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function getNavSections() {
  const navSections = new Map();

  for (section of document.getElementsByTagName("section")) {
    if (section.dataset.nav) {
      navSections.set(section.dataset.nav, section.getAttribute("id"));
    }
  }

  return navSections;
}

function buildLinkFragment(navSections) {
  const linkFrag = new DocumentFragment();

  for (const [key, value] of navSections.entries()) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.dataset.linkId = value;
    a.textContent = key;
    a.classList.add("menu__link");
    li.appendChild(a);
    linkFrag.appendChild(li);
  }

  return linkFrag;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNavigation() {
  const navSections = getNavSections();
  const linkFrag = buildLinkFragment(navSections);
  const navBar = document.querySelector("#navbar__list");

  navBar.addEventListener("click", onNavBarClick);

  navBar.appendChild(linkFrag);
}

// Add class 'active' to section when near top of viewport
function toogleActice(event) {
  for (const section of document.getElementsByTagName("section")) {
    const box = section.getBoundingClientRect();

    if (box.top <= 200 && box.bottom >= 200) {
      section.classList.add("active");
      console.log(section.id + " active");
    } else {
      section.classList.remove("active");
      console.log(section.id + " remove");
    }
  }
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", (event) => {
  buildNavigation();
});

// Scroll to section on link click
function onNavBarClick(event) {
  event.preventDefault();

  document
    .getElementById(event.target.dataset.linkId)
    .scrollIntoView({ behavior: "smooth" });
}

// Set sections as active
document.addEventListener("scroll", toogleActice);
