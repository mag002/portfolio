const chatBox = (id, message, top, left) => {
  const container = document.createElement("div");
  container.setAttribute("class", "nes-balloon from-left chat-box hide");
  container.setAttribute("id", id + "_chat_box");
  container.style.left = left + "px";
  container.style.top = top + "px";
  const messageElement = `<p>${message}</p>`;
  container.innerHTML = messageElement;
  return container;
};

const NPCSpriteSheet = (id, top, left, face, src) => {
  console.log(face);
  let direction = "";
  switch (face) {
    case "left":
      direction = "translateY(-75%)";
      break;
    case "top":
      direction = "translateY(-25%)";
      break;
    case "right":
      direction = "translateY(-50%)";
      break;

    default:
      break;
  }
  const container = document.createElement("div");
  container.setAttribute("class", "NPC");
  container.style.left = left + "px";
  container.style.top = top - 20 + "px";

  const image = document.createElement("img");
  image.setAttribute("src", `assets/${src || "cop_masked.png"}`);
  image.style.transform = direction;
  console.log(image);
  container.appendChild(image);
  console.log(container.offsetHeight);
  console.log(image.offsetHeight);
  return container;
};
