const bodyDOM = document.querySelector("body");
window.onload = function () {
  // effect when load html page
  bodyDOM.classList.add("showUp");
};
const changePage = (page) => {
  // effect when change html page
  bodyDOM.classList.remove("showUp");
  bodyDOM.classList.add("showOut");
  setTimeout(() => {
    window.location.href = page;
  }, 1000);
};
document.addEventListener(
  //prevent zoom on mobile
  "touchmove",
  function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  },
  false
);
