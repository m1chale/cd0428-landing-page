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

    a.href = "#" + value;
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

  document.querySelector("#navbar__list").appendChild(linkFrag);
}

// Add class 'active' to section when near top of viewport

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

// Set sections as active
