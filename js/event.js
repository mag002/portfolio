const handleMenuItemSelect = (action, index) => {
  const e = event || window.event;
  switch (action) {
    case "start": {
      mainMenuEvents.setCurrentItem(index);
      menuLayerDOM.classList.remove("show");
      setTimeout(() => {
        clearMenu();
      }, 1500); // transition time
      break;
    }
    case "quit": {
      mainMenuEvents.setCurrentItem(index);
      console.log(e);
      alert("QUIT?");
      break;
    }
    default: {
      break;
    }
  }
};
