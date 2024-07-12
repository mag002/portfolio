// Declaration
const defaultSquare = 32;
const stepSpeed = 3; // n px for each press
let currentMenu = {};
let movingDirection = "";
const listMenu = {
  MAIN_MENU: {
    key: "MAIN_MENU",
    DOM: "mainMenu",
  },
  EXPERIENCE_MENU: {
    key: "EXPERIENCE_MENU",
    DOM: "experienceMenu",
  },
};
let mouseInterval;
console.log(listMenu);
const maps = [
  {
    id: "map_0",
    name: "out_side",
    size: [13, 18],
    source: "map.png",
    unmovableZone: [
      {
        x: 0,
        y: 0,
        sizeX: 20,
        sizeY: 3,
      },
      {
        x: defaultSquare * 0,
        y: defaultSquare * 3,
        sizeX: 4,
        sizeY: 20,
      },
      {
        x: defaultSquare * 11,
        y: defaultSquare * 4.5,
        sizeX: 2,
        sizeY: 3.5,
      },
      {
        x: defaultSquare * 11,
        y: defaultSquare * 9.5,
        sizeX: 2,
        sizeY: 3.5,
      },
      {
        x: defaultSquare * 11,
        y: defaultSquare * 14.5,
        sizeX: 2,
        sizeY: 3.5,
      },
    ],
    NPCs: [
      {
        id: "npc_0",
        name: "john",
        x: defaultSquare * 4,
        y: defaultSquare * 5,
        src: "cop_masked.png",
        direction: "bottom",
        interaction: {
          talk: "Hi sir! You can't go in",
          action: "wear_mask",
        },
        isNear: false,
      },
      {
        id: "npc_1",
        name: "john",
        x: defaultSquare * 11.5,
        y: defaultSquare * 5.5,
        src: "cop_masked.png",
        direction: "left",
        interaction: {
          talk: "Looking for Phuc experience?",
          action: "wear_mask",
        },
        isNear: false,
      },
      {
        id: "npc_2",
        name: "john",
        x: defaultSquare * 11.5,
        y: defaultSquare * 10.5,
        src: "cop_masked.png",
        direction: "left",
        interaction: {
          talk: "Looking for Phuc experience?",
          action: "wear_mask",
        },
        isNear: false,
      },
      {
        id: "npc_3",
        name: "john",
        x: defaultSquare * 11.5,
        y: defaultSquare * 15.5,
        src: "cop_masked.png",
        direction: "left",
        interaction: {
          talk: "You want to contact with Phuc??",
          action: "wear_mask",
        },
        isNear: false,
      },
    ],
  },
];
let currentMap = maps[0];
console.log(currentMap);
const character = {
  x: 5 * defaultSquare,
  y: 5 * defaultSquare,
  mask_on: false,
};

// DOM
const canvasDOM = document.getElementById("map");
const canvasBoxDOM = document.getElementById("canvasBox");
const mapContainerDOM = document.getElementById("mapContainer");
const mainCharactorDOM = document.getElementById("mainCharacter");
const menuLayerDOM = document.getElementById("menuLayer");
const bodyDOM = document.querySelector("body");
const controllerBtnDOMs = document.querySelectorAll(".controller_btn");
let currentMenuDOM;
const movingCanvas = () => {
  canvasBoxDOM.style.top =
    mapContainerDOM.offsetHeight / 2 - (character.y + defaultSquare / 2) + "px";
  canvasBoxDOM.style.left =
    mapContainerDOM.offsetWidth / 2 - (character.x + defaultSquare / 2) + "px";
};
const checkMoveable = () => {
  const { unmovableZone, NPCs } = currentMap;
  let touch = false;
  unmovableZone.forEach((thing) => {
    if (
      character.x <= thing.x + defaultSquare * thing.sizeX - stepSpeed &&
      thing.x <= character.x + defaultSquare - stepSpeed &&
      character.y <= thing.y + defaultSquare * thing.sizeY - stepSpeed &&
      thing.y <= character.y + defaultSquare - stepSpeed
    ) {
      touch = true;
    }
    if (thing.npcIndex || thing.npcIndex === 0) {
      checkNpcZone(NPCs[thing.npcIndex]);
    }
  });
  return !touch;
};
const checkNpcZone = (npc) => {
  if (
    character.x <= npc.x + defaultSquare * 1.5 &&
    npc.x <= character.x + defaultSquare * 1.5 &&
    character.y <= npc.y + defaultSquare * 1.5 &&
    npc.y <= character.y + defaultSquare * 1.5
  ) {
    npc.isNear = true;
    document.getElementById(npc.id + "_chat_box").classList.remove("hide");
  } else {
    npc.isNear = false;
    document.getElementById(npc.id + "_chat_box").classList.add("hide");
  }
};
const characterEvents = {
  ArrowLeft: function (isMouse = false) {
    mainCharactorDOM.setAttribute(
      "class",
      "Character_spritesheet moving pixelart face-left"
    );
    if (character.x > 0) {
      character.x = character.x - stepSpeed;
      if (!checkMoveable()) {
        return (character.x = character.x + stepSpeed);
      }
      drawCanvas();
      movingCanvas();
    }
    if (isMouse) {
      mouseInterval = setInterval(this.ArrowLeft, 30);
    }
  },
  ArrowUp: function (isMouse = false) {
    mainCharactorDOM.setAttribute(
      "class",
      "Character_spritesheet moving pixelart face-up"
    );
    if (character.y > 0) {
      character.y = character.y - stepSpeed;
      if (!checkMoveable()) {
        return (character.y = character.y + stepSpeed);
      }
      drawCanvas();
      movingCanvas();
    }
    if (isMouse) {
      mouseInterval = setInterval(this.ArrowUp, 30);
    }
  },

  ArrowRight: function (isMouse = false) {
    mainCharactorDOM.setAttribute(
      "class",
      "Character_spritesheet moving pixelart face-right"
    );
    if (character.x < defaultSquare * currentMap.size[0] - defaultSquare) {
      character.x = character.x + stepSpeed;
      if (!checkMoveable()) {
        return (character.x = character.x - stepSpeed);
      }
      drawCanvas();
      movingCanvas();
    }
    if (isMouse) {
      mouseInterval = setInterval(this.ArrowRight, 30);
    }
  },
  ArrowDown: function (isMouse = false) {
    mainCharactorDOM.setAttribute(
      "class",
      "Character_spritesheet moving pixelart face-down"
    );
    if (character.y < defaultSquare * currentMap.size[1] - defaultSquare) {
      character.y = character.y + stepSpeed;
      if (!checkMoveable()) {
        return (character.y = character.y - stepSpeed);
      }
      drawCanvas();
      movingCanvas();
    }
    if (isMouse) {
      mouseInterval = setInterval(this.ArrowDown, 30);
    }
  },

  Space: function () {
    const { NPCs } = currentMap;
    NPCs.forEach((npc) => {
      if (
        character.x <= npc.x + defaultSquare * 1.5 &&
        npc.x <= character.x + defaultSquare * 1.5 &&
        character.y <= npc.y + defaultSquare * 1.5 &&
        npc.y <= character.y + defaultSquare * 1.5
      ) {
        alert(npc.interaction.action);
      }
    });
  },
  Escape: function () {
    openMenu(listMenu.MAIN_MENU);
  },
  stopMoving: function () {
    // e = e || window.event;
    if (mouseInterval) {
      clearInterval(mouseInterval);
    }
    mainCharactorDOM.classList.remove("moving");
  },
};
const mainMenuEvents = {
  ArrowUp: function () {
    this.setCurrentItem(currentMenu.currentItem - 1);
  },
  ArrowDown: function () {
    this.setCurrentItem(currentMenu.currentItem + 1);
  },
  Space: function () {
    let _currentItem = currentMenu.currentItem;
    currentMenu.items[_currentItem].click();
  },
  Escape: function () {
    clearMenu();
  },
  setCurrentItem: function (indexToSet) {
    if (indexToSet >= currentMenu.items.length || indexToSet < 0) {
      return;
    }
    for (let index = 0; index < currentMenu.items.length; index++) {
      currentMenu.items[index].classList.remove("selected");
    }
    currentMenu.currentItem = indexToSet;
    currentMenu.items[indexToSet].classList.add("selected");
  },
};

const subMenuEvents = {
  Escape: function () {
    console.log("+++IN");
    switchMenu(listMenu.MAIN_MENU);
  },
};

function absorbEvent_(event) {
  var e = event || window.event;
  e.preventDefault && e.preventDefault();
  e.stopPropagation && e.stopPropagation();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

function preventLongPressMenu(node) {
  node.ontouchstart = absorbEvent_;
  node.ontouchmove = absorbEvent_;
  node.ontouchend = absorbEvent_;
  node.ontouchcancel = absorbEvent_;
}
window.onresize = function () {
  drawCanvas();
  movingCanvas();
};

// ** HANDLE CHARACTERS AND MENU MOVING DIRECTION
document.addEventListener("keydown", (e) => {
  e = e || window.event;
  movingDirection = e.code;
  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "Shift",
      "Escape",
      "Space",
    ].indexOf(movingDirection) > -1
  ) {
    e.preventDefault();
    switch (currentMenu.key) {
      case listMenu.MAIN_MENU.key: {
        if (
          ["ArrowUp", "ArrowDown", "Space", "Escape"].indexOf(movingDirection) >
          -1
        ) {
          mainMenuEvents[movingDirection]();
        }
        break;
      }
      case listMenu.EXPERIENCE_MENU.key: {
        if (subMenuEvents[movingDirection]) {
          subMenuEvents[movingDirection]();
        }
        break;
      }
      default: {
        if (isEmptyObject(currentMenu)) {
          characterEvents[movingDirection]();
          break;
        }
      }
    }
  }
});
// ** CHARACTER STOP MOVING HANDLING
document.addEventListener("keyup", (e) => {
  // e = e || window.event;
  // mainCharactorDOM.classList.remove("moving");
  characterEvents.stopMoving(e);
});

// ** DRAW Canvas
ctx = canvasDOM.getContext("2d");
canvasDOM.setAttribute("width", defaultSquare * currentMap.size[0]);
canvasDOM.setAttribute("height", defaultSquare * currentMap.size[1]);
ctx.fillStyle = "#00ff00";
ctx.strokeStyle = "#ff0000";
// ** Draw grid
const drawGrid = () => {
  // ** Draw X
  for (i = 0; i <= currentMap.size[1]; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * defaultSquare);
    ctx.lineTo(defaultSquare * currentMap.size[1], i * defaultSquare);
    ctx.stroke();
  }
  // ** Draw Y
  for (i = 0; i <= currentMap.size[1]; i++) {
    ctx.beginPath();
    ctx.moveTo(i * defaultSquare, 0);
    ctx.lineTo(i * defaultSquare, defaultSquare * currentMap.size[1]);
    ctx.stroke();
  }
};
// ** Draw character
const drawCharacter = (character) => {
  ctx.beginPath();
  ctx.arc(
    character.x + defaultSquare / 2,
    character.y + defaultSquare / 2,
    defaultSquare / 2,
    0,
    2 * Math.PI
  );
  // ctx.fill();

  // Only NPC have id
  if (character.id && !character.renderedChat) {
    drawChatBox(character);
  }
  if (character.id && !character.renderedImg) {
    drawNPCImage(character);
  }

  // ** Show NPC talk
  if (character.isNear) {
    ctx.beginPath();
    ctx.arc(character.x, character.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
  }
};
// ** Draw NPCs
const drawNPCs = () => {
  const { NPCs } = currentMap;
  NPCs.forEach((npc) => {
    drawCharacter(npc);
  });
};
const drawUnmoveZone = () => {
  const { unmovableZone } = currentMap;
  ctx.beginPath();
  unmovableZone.forEach((zone) => {
    ctx.rect(
      zone.x,
      zone.y,
      zone.sizeX * defaultSquare,
      zone.sizeY * defaultSquare
    );
    ctx.fill();
  });
};

const drawCanvas = () => {
  ctx.clearRect(0, 0, canvasDOM.width, canvasDOM.height);
  // draw drid
  // drawGrid();
  // ** Draw character position
  canvasDOM.style.backgroundImage = `url(assets/${currentMap.source})`;
  canvasDOM.style.backgroundSize = "cover";
  // drawCharacter(character);
  // ** Draw NPCs
  drawNPCs();
  // drawUnmoveZone();
};

// MAIN

// ** Draw NPC chatbox
const drawChatBox = (character) => {
  const chatBoxLeft = character.x;
  const chatBoxTop = character.y - defaultSquare;
  canvasBoxDOM.appendChild(
    chatBox(character.id, character.interaction.talk, chatBoxTop, chatBoxLeft)
  );
  character.renderedChat = true;
};
const drawNPCImage = (character) => {
  const chatBoxLeft = character.x;
  const chatBoxTop = character.y;
  canvasBoxDOM.appendChild(
    NPCSpriteSheet(character.id, chatBoxTop, chatBoxLeft, character.direction)
  );
  character.renderedImg = true;
};
const openMenu = (menu) => {
  menuLayerDOM.classList.remove("d-none");
  menuLayerDOM.classList.add("show");
  currentMenu = menu;
  const inner = menuDOMList[currentMenu.DOM]();
  menuLayerDOM.innerHTML = inner;
  currentMenuDOM = document.getElementById(currentMenu.DOM);
  currentMenu.items = document.querySelectorAll(`#${currentMenu.DOM} li`);
  console.log(menu.key);
  if (["MAIN_MENU"].indexOf(menu.key) > -1) {
    setTimeout(() => {
      currentMenu.items[0].classList.add("selected");
      currentMenu.currentItem = 0;
    }, 500);
  }
};
const clearMenu = () => {
  menuLayerDOM.classList.remove("show");
  // menuLayerDOM.classList.add("d-none");
  currentMenu = {};
};
const switchMenu = (menu) => {
  menuLayerDOM.style.filter = "brightness(0)";

  setTimeout(() => {
    currentMenu = menu;
    const inner = menuDOMList[currentMenu.DOM]();
    menuLayerDOM.innerHTML = inner;
    currentMenuDOM = document.getElementById(currentMenu.DOM);
    currentMenu.items = document.querySelectorAll(`#${currentMenu.DOM} li`);
    if (["MAIN_MENU"].indexOf(menu.key) > -1) {
      setTimeout(() => {
        currentMenu.items[0].classList.add("selected");
        currentMenu.currentItem = 0;
      }, 500);
    }
    menuLayerDOM.style.filter = "";
  }, 1000);
};

function main() {
  openMenu(listMenu.MAIN_MENU);
  const { NPCs } = currentMap;
  // character.x = defaultSquare / 2;
  // character.y = defaultSquare / 2;
  NPCs.forEach((npc, index) => {
    currentMap.unmovableZone.push({
      x: npc.x,
      y: npc.y,
      sizeX: 1,
      sizeY: 1,
      isNPC: true,
      npcIndex: index,
    });
  });
  drawCanvas();
  movingCanvas();
  // clearMenu();
  // console.log(controller_btns);
}

main();
window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
window.onload = function () {
  // ** Add event for controllers
  bodyDOM.classList.add("showUp");
  var md = window.mobileCheck();
  for (let i = 0; i < controllerBtnDOMs.length; i++) {
    const direction = controllerBtnDOMs[i].getAttribute("direction");
    controllerBtnDOMs[i].addEventListener(
      md ? "touchstart" : "mousedown",
      function (e) {
        console.log(e);
        characterEvents.stopMoving();
        e.preventDefault;
        characterEvents[direction](true);
      }
    );
    controllerBtnDOMs[i].addEventListener(
      md ? "touchend" : "mouseup",
      function (e) {
        e.preventDefault;
        characterEvents.stopMoving();
      }
    );
  }
};
// window.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

/**
 *
 * when Move X
 * - Check is in any Y ahead
 * - If have Y ahead, check is X iss in unmoveable
 */
