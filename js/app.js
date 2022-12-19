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
let navigation = [];
/**
 * End Global Variables
 * Start Helper Functions
 *
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
function toogleActive() {
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
  if (event.target.tagName == "A") {
    event.preventDefault();

    document
      .getElementById(event.target.dataset.linkId)
      .scrollIntoView({ behavior: "smooth" });
  }
}

// Set sections as active
document.addEventListener("scroll", toogleActive);
