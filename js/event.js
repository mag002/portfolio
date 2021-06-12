// This file for all events listener
const handleMenuItemSelect = (action, index) => {
  const e = event || window.event;
  console.log(action, index);
  switch (action) {
    case "start": {
      mainMenuEvents.setCurrentItem(index);
      menuLayerDOM.classList.remove("show");
      setTimeout(() => {
        clearMenu();
      }, 1500); // transition time
      break;
    }
    case "experience": {
      switchMenu(listMenu.EXPERIENCE_MENU);
      break;
    }
    case "quit": {
      // mainMenuEvents.setCurrentItem(index);
      if (confirm("Are you sure?")) {
        menuLayerDOM.style.filter = "brightness(0)";
        setTimeout(() => {
          open(INFO.linkedIn, "_self").close();
        }, 1000);
      }
      break;
    }
    default: {
      mainMenuEvents.setCurrentItem(index);
      alert("Feature will coming soon");
      // menuLayerDOM.classList.remove("show");
      break;
    }
  }
};

const mainMenuToggle = (type) => {
  if (type === "menu") {
    document
      .querySelector(".mainMenu_profile>div")
      .classList.add("menu_collapse");
    document
      .querySelector(".mainMenu_menu>div")
      .classList.remove("menu_collapse");
  } else {
    document
      .querySelector(".mainMenu_profile>div")
      .classList.remove("menu_collapse");
    document.querySelector(".mainMenu_menu>div").classList.add("menu_collapse");
  }
};
