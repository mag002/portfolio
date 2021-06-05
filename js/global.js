const bodyDOM = document.querySelector("body");
window.onload = function () {
  bodyDOM.classList.add("showUp");
};
const changePage = (page) => {
  bodyDOM.classList.remove("showUp");
  bodyDOM.classList.add("showOut");
  setTimeout(() => {
    window.location.href = page;
  }, 1000);
};
