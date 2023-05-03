const menuBar = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");
const navElements = [nav1, nav2, nav3, nav4, nav5];

function navAnimation(direction1, direction2) {
  navElements.forEach((nav, i) => {
    nav.classList.replace(
      `silde-${direction1}-${i + 1}`,
      `silde-${direction2}-${i + 1}`
    );
  });
}

function toggleNav() {
  //toggle menu open/close
  menuBar.classList.toggle("change");
  //toggle menu active
  // overlay-active is not exsists
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    //animate in -overlay
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");

    //
    navAnimation("out", "in");
  } else {
    //animate out -overlay
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    //
    navAnimation("in", "out");
  }
}
// add event listener
menuBar.addEventListener("click", toggleNav);
navElements.forEach((nav) => {
  nav.addEventListener("click", toggleNav);
});
