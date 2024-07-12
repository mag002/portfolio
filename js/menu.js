const formatDate = (date) => {
  const _date = new Date(date);
  let day = _date.getDate();
  let month = _date.getMonth();
  let year = _date.getFullYear();
  const monthText = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthText[month]}, ${year}`;
};
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
              <div>
                <img
                  src="assets/pixelAvatar.png"
                  alt="phucle avatar"
                  class="mainMenu_avatar"
                />
                <p>
                  ${" " || INFO.ojective}
                </p>
              </div>
              <div class="mainMenu_info mt-3">
                <p>Name: ${INFO.name}</p>
                <p>Age: ${new Date().getFullYear() - INFO.age}</p>
                <p>Location: ${INFO.location}</p>
                <p>Country: ${INFO.country}</p>
              </div>
              <hr />
              <div class="mainMenu_contacts">
                <div class="mainMenu_contact">
                  <i class="nes-icon is-medium whatsapp"></i>
                  <a href="tel:+84${INFO.phone}">${INFO.phone}</a>
                </div>
                <div class="mainMenu_contact">
                  <i class="nes-icon is-medium gmail"></i>
                  <a href="mailto:${INFO.email}"
                    >${INFO.email}</a
                  >
                </div>
                <div class="mainMenu_contact">
                  <i class="nes-icon is-medium linkedin"></i>
                  <a href="${INFO.linkedIn}"
                    >LinkedIn</a
                  >
                </div>
                <div class="mainMenu_contact">
                  <i class="nes-icon is-medium github"></i>
                  <a href="${INFO.github}">Github</a>
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
            <button class="nes-btn is-error" onclick="handleMenuItemSelect('quit')">Quit</button>
            <button class="nes-btn is-primary" onclick="clearMenu()">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  },
  experienceMenu: function () {
    const { experience } = INFO;
    console.log(experience);
    const _string = experience.map((company) => {
      return `
      <div class="row company mb-5">
        <!-- // One company -->
        <div class="col-md-2 col-12">
          <div
            class="
            is-sticky
              d-flex
              flex-md-column
              align-items-md-start align-items-center 
              justify-content-md-center justify-content-between
            "
          >
            <div class="company-logo corner-border">
              <img
                src="${company.logo}"
                alt=""
              />
            </div>
            <div class="perfect-center flex-column">
              <a href="#" class="nes-badge mt-4 d-block">
                <span class="is-dark">${company.name}</span>
              </a>
              <a href="#" class="nes-badge mt-2 d-block">
                <span class="is-warning">${company.role}</span>
              </a>
              <div><span>${formatDate(company.to)}</span></div>
              <div><span>${formatDate(company.from)}</span></div>
            </div>
          </div>
        </div>
        <div class="col-md-10 col-12">
          <!-- PROJECTS -->
          ${company.projects
            .map((project) => {
              return `
              <div class="project">
                <a href="#" class="mb-3 nes-badge" style="color: ${
                  project.color.text
                }">
                  <span
                    class="px-2 py-1"
                    style="
                      background-color: ${project.color.background};
                      box-shadow: 0 0.5em ${
                        project.color.background
                      }, 0 -0.5em ${project.color.background},
                        0.5em 0 ${project.color.background}, -0.5em 0 ${
                project.color.background
              };
                    "
                    class="is-dark"
                    >${project.name}</span
                  >
                </a>
    
                <dl class="ml-3 nes-list is-circle">
                  <li class="px-3">Work description:</li>
                  <dd>
                      ${project.description.trim()}
                  </dd>
                  <li class="px-3">Skills set utilized:</li>
                  <dd>${project.skillSets.join()}</dd>
                </dl>
              </div>  
              `;
            })
            .join("")}
         
          <hr />
        </div>

      </div>

      `;
    });
    return `
    <div id="experienceMenu">
      <div class="container-fluid py-3">
        <div class="nes-container with-title">
          <p class="title">Profile</p>
          <div class="company-container container-fluid">
            ${_string.join("")}
          </div>
        </div>
         
        <div class="menu-actions d-flex justify-content-end mt-2">
          <button class="nes-btn is-primary" onclick="switchMenu(listMenu.MAIN_MENU)">Back</button>
          <!-- <button class="nes-btn is-primary">Ok</button>-->
        </div>
      </div>
     
    </div>
    `;
  },
};
