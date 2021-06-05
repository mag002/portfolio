const handleMenuItemSelect = (action) => {
  const e = event || window.event;
  switch (action) {
    case "start": {
      menuLayerDOM.classList.remove("show");
      setTimeout(() => {
        clearMenu();
      }, 1500); // transition time
      break;
    }
    case "quit": {
      console.log(e);
      alert("QUIT?");
      break;
    }
    default: {
      break;
    }
  }
};
