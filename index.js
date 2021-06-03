// Declaration
const defaultSquare = 32;
const stepSpeed = 3; // n px for each press
const unmovableZone = [
  // {
  //   x: 96,
  //   y: 96,
  //   sizeX: 2,
  //   sizeY: 1,
  // },
  // {
  //   x: 128,
  //   y: 128,
  //   sizeX: 1,
  //   sizeY: 2,
  // },
];
const maps = [
  {
    id:'map_0',
    name:'out_side',
    size:[20,20],
    source: 'map_3.png',
    unmovableZone : [
      {
      x: 0,
      y: 0,
      sizeX: 20,
      sizeY: 5,
    },
    // {
    //   x:0,
    //   y:3*defaultSquare,
    //   sizeX:1,
    //   sizeY:2
    // },
    // {
    //   x:3*defaultSquare,
    //   y:3*defaultSquare,
    //   sizeX:1,
    //   sizeY:2
    // }
    ],
    NPCs: [
      {
        id: 'npc_0',
        name: "john",
        x: defaultSquare * 10,
        y: defaultSquare * 10,
        src: 'cop_masked.png',
        interaction: {
          talk: "Hi there! Please put the mask on to join",
          action: "wear_mask",
        },
        isNear: false,
      }
    ]
  }
]
let currentMap = maps[0]
console.log(currentMap);
// const NPCs = [
//   {
//     id: 'npc_0',
//     name: "john",
//     x: defaultSquare *3,
//     y: defaultSquare * 0,
//     src: 'cop_masked.png',
//     interaction: {
//       talk: "Hi there! Please put the mask on to join",
//       action: "wear_mask",
//     },
//     isNear: false,
//   },
//   // {
//   //   id: 'npc_1',
//   //   name: "quick",
//   //   x: defaultSquare * 4,
//   //   y: defaultSquare * 1,
//   //   interaction: {
//   //     talk: "Yo! I'm Quick, Looking for Phuc's Projects?",
//   //     action: "open_profile",
//   //   },
//   //   isNear: false,
//   // },
// ];
const character = {
  x: 1 * defaultSquare,
  y: 6 * defaultSquare,
  mask_on: false
};
// const map = {
//   name: "home",
//   src: "",
// };

// DOM
const canvasDOM = document.getElementById("map");
const canvasBoxDOM = document.getElementById("canvasBox");
const mapContainerDOM = document.getElementById("mapContainer");
const mainCharactorDOM = document.getElementById("mainCharacter");

const movingCanvas = () => {
  canvasBoxDOM.style.top =
    mapContainerDOM.offsetHeight / 2 - (character.y + defaultSquare / 2) + "px";
  canvasBoxDOM.style.left =
    mapContainerDOM.offsetWidth / 2 - (character.x + defaultSquare / 2) + "px";
};
const checkMoveable = () => {
  const {unmovableZone,NPCs} = currentMap; 
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
    document.getElementById(npc.id+'_chat_box').classList.remove('hide')
  } else {
    npc.isNear = false;
    document.getElementById(npc.id+'_chat_box').classList.add('hide')

  }
};
const moveLeft = () => {
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
};
const moveUp = () => {
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
};

const moveRight = () => {
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
};
const moveDown = () => {
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
};

const action = () => {
  const {NPCs} = currentMap; 
  NPCs.forEach(npc=>{
    if (
      character.x <= npc.x + defaultSquare * 1.5 &&
      npc.x <= character.x + defaultSquare * 1.5 &&
      character.y <= npc.y + defaultSquare * 1.5 &&
      npc.y <= character.y + defaultSquare * 1.5
    ) {
      alert(npc.interaction.action)
    } 
  })
}

window.onresize = function () {
  drawCanvas();
  movingCanvas();
};
document.addEventListener("keydown", (e) => {
  e = e || window.event;
  if (["38", "40", "37", "39"].indexOf(e.keyCode.toString()) > -1){
    e.preventDefault()
  }
  if (e.keyCode == "38") {
    // up arrow
    moveUp();
  } else if (e.keyCode == "40") {
    // down arrow
    moveDown();
  } else if (e.keyCode == "37") {
    // left arrow
    moveLeft();
  } else if (e.keyCode == "39") {
    // right arrow
    moveRight();
  } else if (e.keyCode == "32") {
    // right arrow
    action();
  }
});
document.addEventListener("keyup", (e) => {
  e = e || window.event;
  mainCharactorDOM.classList.remove("moving");
});

// DRAW
ctx = canvasDOM.getContext("2d");
canvasDOM.setAttribute("width", defaultSquare * currentMap.size[0]);
canvasDOM.setAttribute("height", defaultSquare *  currentMap.size[1]);
ctx.fillStyle = "#00ff00";
ctx.strokeStyle = "#ff0000";
//draw X
// draw grid
const drawGrid = () => {
  for (i = 0; i <= currentMap.size[1]; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * defaultSquare);
    ctx.lineTo(defaultSquare * currentMap.size[1], i * defaultSquare);
    ctx.stroke();
  }
  // draw Y
  for (i = 0; i <= currentMap.size[1]; i++) {
    ctx.beginPath();
    ctx.moveTo(i * defaultSquare, 0);
    ctx.lineTo(i * defaultSquare, defaultSquare * currentMap.size[1]);
    ctx.stroke();
  }
};
// draw character
const drawCharacter = (character) => {
  // ctx.beginPath();
  // ctx.arc(
  //   character.x + defaultSquare / 2,
  //   character.y + defaultSquare / 2,
  //   defaultSquare / 2,
  //   0,
  //   2 * Math.PI
  // );
  // ctx.fill();
  
  // Only NPC have id
  if(character.id && !character.renderedChat){
    drawChatBox(character);
  }
  if(character.id && !character.renderedImg){
    drawNPCImage(character);
  }


  // Show NPC talk
  if(character.isNear){
    ctx.beginPath();
    ctx.arc(character.x,character.y,10,0,2*Math.PI);
    ctx.stroke();
  }
};
// draw NPCs
const drawNPCs = () => {
  const {NPCs} = currentMap; 
  NPCs.forEach((npc) => {
    drawCharacter(npc);
  });
};
const drawUnmoveZone = () => {
  const {unmovableZone} = currentMap; 
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
  // draw character position
  canvasDOM.style.backgroundImage = `url(assets/${currentMap.source})`
  canvasDOM.style.backgroundSize = 'cover'
  drawCharacter(character);
  // draw NPCs
  drawNPCs();
  // drawUnmoveZone();

  };

// MAIN

// Draw NPC chatbox
const drawChatBox = (character) => {
  const chatBoxLeft = character.x;
  const chatBoxTop  = character.y - defaultSquare;
  canvasBoxDOM.appendChild(chatBox(character.id, character.interaction.talk,chatBoxTop,chatBoxLeft))
  character.renderedChat = true;
}
const drawNPCImage = (character) => {
  const chatBoxLeft = character.x;
  const chatBoxTop  = character.y;
  canvasBoxDOM.appendChild(NPCSpriteSheet(character.id,chatBoxTop,chatBoxLeft))
  character.renderedImg = true;
}

function main() {
  const {NPCs} = currentMap; 
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
}

main();

/**
 *
 * when Move X
 * - Check is in any Y ahead
 * - If have Y ahead, check is X iss in unmoveable
 */
