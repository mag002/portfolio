const chatBox = (id, message, top, left) => {
    const container = document.createElement('div');
    container.setAttribute('class','nes-balloon from-left chat-box hide');
    container.setAttribute('id',id + '_chat_box');
    container.style.left=left+"px";
    container.style.top=top+"px";
    const messageElement = `<p>${message}</p>`
    container.innerHTML = messageElement
    return container
}

const NPCSpriteSheet = (id,top,left) => {
    const container = document.createElement('div');
    container.setAttribute('class','NPC');
    container.style.left=left+"px";
    container.style.top=top-20+"px";

    const image = document.createElement('img')
    image.setAttribute('src','assets/cop_masked.png');
    container.appendChild(image);
    console.log(container.offsetHeight);
    console.log(image.offsetHeight);
    return container
}