let wsUri = "wss://echo.websocket.org/"
let myId = "Simon" + new Date().getMilliseconds()

function setup() {
  createCanvas(400, 400)
  background(0)
  // Start a socket connection to the server
  startWebSocket()
}

function draw() {

}

function startWebSocket()
{
  websocket = new WebSocket(wsUri);

  websocket.onopen = (evt) => { 
    console.log(evt) 
  }
  
  websocket.onclose = (evt) => { 
    console.log(evt) 
  }
  
  websocket.onmessage =  async (evt) => {
    const t = await JSON.parse(evt.data)
    console.log('Message from' + t.id)
    //websocket.close()
  }
  
  websocket.onerror = (evt) => { 
    console.log(evt) 
  }
  
}


function mouseDragged() {
  // Send the mouse coordinates as a BLOB - https://developer.mozilla.org/en-US/docs/Web/API/Blob
  const obj = {type:'move', id:myId, x: mouseX, y:mouseY}
  //const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
  websocket.send(JSON.stringify(obj))
}
