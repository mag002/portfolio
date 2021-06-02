// Declaration
const defaultSquare = 32;
const mapSize = 10;
const stepSpeed = 3; // n px for each press
const unmovableZone = [
  {
    x: 96,
    y: 96,
    sizeX: 2,
    sizeY: 1,
  },
  {
    x: 128,
    y: 128,
    sizeX: 1,
    sizeY: 2,
  },
];
const unmovableZoneArray = {
  left: [],
  right: [],
  up: [],
  down: [],
};
const NPCs = [
  {
    name: "john",
    x: defaultSquare * 2,
    y: defaultSquare * 2,
    interaction: {
      talk: "Hi I'm John, I will introduce you to Phuc profile",
      action: "open_profile",
    },
    isNear: false,
  },
];
const character = {
  x: 0,
  y: 0,
};
const map = {
  name: "home",
  src: "",
};

// DOM
const canvasDOM = document.getElementById("map");
const mapContainerDOM = document.getElementById("mapContainer");
const mainCharactorDOM = document.getElementById("mainCharacter");

const movingCanvas = () => {
  canvasDOM.style.top =
    mapContainerDOM.offsetHeight / 2 - (character.y + defaultSquare / 2) + "px";
  canvasDOM.style.left =
    mapContainerDOM.offsetWidth / 2 - (character.x + defaultSquare / 2) + "px";
};
const checkMoveable = () => {
  let touch = false;
  unmovableZone.forEach((thing) => {
    if (
      character.x <= (thing.x + defaultSquare*thing.sizeX) &&
      thing.x <= character.x + defaultSquare &&
      character.y <= (thing.y+ defaultSquare*thing.sizeY)  &&
      thing.y <= character.y + defaultSquare
    ) {
      touch = true;
    }
    if(thing.npcIndex || thing.npcIndex === 0 ){
      checkNpcZone(NPCs[thing.npcIndex])
    }
  });
  return !touch;
};
const checkNpcZone = (npc) => {
  console.log(npc);
  if(
    character.x <= npc.x + defaultSquare * 1.5 &&
    npc.x <= character.x + defaultSquare * 1.5 &&
    character.y <= npc.y + defaultSquare * 1.5 &&
    npc.y <= character.y + defaultSquare * 1.5
    ){
      npc.isNear  = true;
  console.log(npc.name +  'near');

    } else {
      npc.isNear = false
  console.log(npc.name +  'far');

    }
}
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
  if (character.x < defaultSquare * mapSize - defaultSquare) {
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
  if (character.y < defaultSquare * mapSize - defaultSquare) {
    character.y = character.y + stepSpeed;
    if (!checkMoveable()) {
      return (character.y = character.y - stepSpeed);
    }
    drawCanvas();
    movingCanvas();
  }
};

window.onresize = function () {
  drawCanvas();
  movingCanvas();
};
document.addEventListener("keydown", (e) => {
  e = e || window.event;

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
  }
});
document.addEventListener("keyup", (e) => {
  e = e || window.event;
  mainCharactorDOM.classList.remove("moving");
});

// DRAW
ctx = canvasDOM.getContext("2d");
canvasDOM.setAttribute("width", defaultSquare * mapSize);
canvasDOM.setAttribute("height", defaultSquare * mapSize);
ctx.fillStyle = "#00ff00";
ctx.strokeStyle = "#ff0000";
//draw X
// draw grid
const drawGrid = () => {
  for (i = 0; i <= mapSize; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * defaultSquare);
    ctx.lineTo(defaultSquare * mapSize, i * defaultSquare);
    ctx.stroke();
  }
  // draw Y
  for (i = 0; i <= mapSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * defaultSquare, 0);
    ctx.lineTo(i * defaultSquare, defaultSquare * mapSize);
    ctx.stroke();
  }
};
// draw character
const drawCharacter = (character) => {
  ctx.beginPath();

  ctx.arc(
    character.x + defaultSquare / 2,
    character.y + defaultSquare / 2,
    defaultSquare / 2,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = "#00ff00";
  if(character.isNear){
    console.log('zooo');
    ctx.fillStyle = '#0000ff'
  }
  ctx.fill();
};
// draw NPCs
const drawNPCs = () => {
  NPCs.forEach((npc) => {
    drawCharacter(npc);
  });
};
const drawUnmoveZone = () => {
  ctx.beginPath();
  unmovableZone.forEach((zone) => {
    ctx.rect(
      zone.x,
      zone.y,
      zone.sizeX * defaultSquare,
      zone.sizeY * defaultSquare
    );
    if(!zone.isNPC){
      ctx.fillStyle = "#ff0000";
    }
    ctx.fill();
    // unmovableZoneArray.right.push(zone.x);
    // unmovableZoneArray.down.push(zone.y);
    // unmovableZoneArray.left.push(zone.x + zone.sizeX*defaultSquare);
    // unmovableZoneArray.up.push(zone.y + zone.sizeY*defaultSquare);
  });
};

const drawCanvas = () => {
  ctx.clearRect(0, 0, canvasDOM.width, canvasDOM.height);
  // draw drid
  drawGrid();
  // draw character position
  drawCharacter(character);
  // draw NPCs
  drawNPCs();
  drawUnmoveZone();

  document.getElementById(
    "coors"
  ).innerHTML = `Character_x:${character.x} </br>Charater_y:${character.y}`;
};

// MAIN

function main() {
  // character.x = defaultSquare / 2;
  // character.y = defaultSquare / 2;
  NPCs.forEach((npc,index) => {
    unmovableZone.push({
      x: npc.x,
      y: npc.y,
      sizeX: 1,
      sizeY: 1,
      isNPC:true,
      npcIndex: index
    });
  });
  unmovableZone.forEach((zone) => {
    unmovableZoneArray.right.push(zone.x);
    unmovableZoneArray.down.push(zone.y);
    unmovableZoneArray.left.push(zone.x + zone.sizeX * defaultSquare);
    unmovableZoneArray.up.push(zone.y + zone.sizeY * defaultSquare);
  });
  console.log(unmovableZoneArray);
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
