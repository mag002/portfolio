// This file save all Menu HTML
const menuDOMList = {
  // id is key and match with listMenu on index.js
  // li handleMenuItemSelect('actionName', index)
  mainMenu: function () {
    const listAction = [
      {
        key: "experience",
        label: "Experience",
      },
      {
        key: "projects",
        label: "Projects",
      },
      {
        key: "skills",
        label: "Skills",
      },
      {
        key: "interests",
        label: "Interests",
      },
      {
        key: "contactMe",
        label: "Contact Me",
      },
    ];
    // const container = document.createElement('div');
    //   container.setAttribute('id','mainMenu')
    //   container.setAttribute('class', 'd-flex justify-content-center align-items-center flex-column')
    //   const listContainer = document.createElement('ul');
    const listActionDOMString = listAction.reduce((string, action, index) => {
      return (string =
        string +
        `<li
        class="mainMenu_select"
        onclick="handleMenuItemSelect('${action.key}',${index})"
        >
        ${action.label}
        </li>`);
    }, "");
    return `
    <div id="mainMenu">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 col-12 my-3">
          <div class="nes-container with-title mainMenu_profile" onclick="mainMenuToggle('profile')">
            <p class="title">Profile</p>
            <div>
              <img
                src="assets/pixelAvatar.png"
                alt="phucle avatar"
                class="mainMenu_avatar"
              />
              <div class="mainMenu_info mt-3">
                <p>Name: Phuc Le</p>
                <p>Age: 24</p>
                <p>Location: Hochiminh city</p>
                <p>Country: Vietnam</p>
              </div>
              <hr />
              <div class="mainMenu_contacts">
                <div class="mainMenu_contact">
                  <i class="nes-icon is-medium whatsapp"></i>
                  <a href="tel:+84921805325">0921805325</a>
                </div>
                <div class="mainMenu_contact">
                  <i class="nes-icon is-medium gmail"></i>
                  <a href="mailto:lehongphuc7394@gmail.com"
                    >lehongphuc7394</a
                  >
                </div>
                <div class="mainMenu_contact">
                  <i class="nes-icon is-medium linkedin"></i>
                  <a href="https://www.linkedin.com/in/le-phuc-169538173/"
                    >LinkedIn</a
                  >
                </div>
                <div class="mainMenu_contact">
                  <i class="nes-icon is-medium github"></i>
                  <a href="https://github.com/mag002">Github</a>
                </div>
              </div>
            </div>
            <p class="click_to_show">Touch here to show more...</p>
          </div>
        </div>
        <div class="col-md-6 col-12 my-3">
          <div class="nes-container with-title mainMenu_menu" onclick="mainMenuToggle('menu')">
            <p class="title">Menu</p>
            <div class="menu_collapse">
                <ul class="nes-list is-circle">
                ${listActionDOMString}
                </ul>
            </div>
            <p class="click_to_show">Touch here to show more...</p>
          </div>
          <div class="d-flex justify-content-end mainMenu_actions mt-2">
            <button class="nes-btn is-error">Quit</button>
            <button class="nes-btn is-primary">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  },
};
