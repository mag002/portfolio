const handleMenuItemSelect = (action) => {
  switch (action) {
    case "start": {
      menuLayerDOM.classList.remove("show");
      setTimeout(() => {
        clearMenu();
      }, 1500); // transition time
      break;
    }
    case "quit": {
      alert("QUIT?");
      break;
    }
    default: {
      break;
    }
  }
};
