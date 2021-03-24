let client 
const clientId = 'anonymous-' + Math.random().toString(16).substr(2, 8)
const host = 'wss://test.mosquitto.org:8081'
let members = []
let title = ''
let chatContainer, chatInputContainer, chatMessages, controlsContainer

function setup() {
  createCanvas(displayWidth, displayHeight)
  createNamebar()
  createChat()
  createControls()
  mqttInit()
  //subscribe to videochannel
  client.subscribe('videochannel')

  //handle MQTT messages
  client.on('message', async (topic, message, packet) => {
    let obj = JSON.parse(message)
    if(topic.includes('videochannel') && obj.type == 'move'){
      let exist = members.find(member => member.id == obj.id)
      if(exist) { exist.title=obj.title,exist.x = obj.x; exist.y = obj.y }
      else{ members.push(obj) }
    }
    if(topic.includes('videochannel') && obj.type == 'message'){
      let temp = chatMessages.html()
      chatMessages.html(obj.name + ' siger: ' + obj.message + '<br>' + temp)
    }
    if(topic.includes('videochannel') && obj.type == 'leave'){
        members.map( (member, index) => {
          if(member.id == obj.id) members.splice(index, 1)
        })
    }
  })
}

function draw() {
  if(frameCount % 20 == 0) {
    background('lightblue')
    if( title != ''){
      // Send the mouse coordinates as JSON
      const obj = {type:'move', 'title':title, 'id':clientId, 'x': mouseX, 'y':mouseY}
      client.publish('videochannel', JSON.stringify(obj))
      members.map(member => {
        fill('white')
        ellipse(member.x, member.y, 16, 16)
        fill('darkblue')
        text(member.title, member.x + 20 , member.y + 3)
      })
    }
  }
}

const createControls = () => {
  controlsContainer = createDiv().class('controlsContainer hidden')
  let quitBtn = createButton('quit')
  controlsContainer.child(quitBtn)
  quitBtn.mouseClicked(() => {
    let obj = {
      type:'leave',
      id:clientId,
    }
    client.publish('videochannel', JSON.stringify(obj))
    controlsContainer.class('hidden')
    title = ''
    createChat()
    createNamebar()
  })
}

const createChat = () => {
  chatContainer = createDiv().class('chatContainer')
  chatInputContainer = createDiv().class('chatInputContainer hidden')
  let newMessage = createInput().class('message')
  let send = createButton('send')
  chatInputContainer.child(newMessage)
  chatInputContainer.child(send)
  chatContainer.child(chatInputContainer)
  
  
  chatMessages = createDiv().class('chatMessages')
  chatContainer.child(chatMessages)
  
  send.mouseClicked(()=>{
    obj = {
      type:'message',
      name: title,
      message: newMessage.value()
    }
    newMessage.value('')
    client.publish('videochannel', JSON.stringify(obj))
  })

}

const createNamebar = () => {
  let div = createDiv().class('nameBar')
  let i = createInput(title).attribute('placeHolder', 'dit navn...')
  let b = createButton('ok')
  div.child(i)
  div.child(b)
  div.center()
  b.mouseClicked(()=>{
    title = i.value()
    div.hide()
    chatInputContainer.removeClass('hidden')
    controlsContainer.removeClass('hidden')
  })
}
const mqttInit = () => {
  const options = {
    keepalive: 300,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
    rejectUnauthorized: false
  }

  console.log('connecting mqtt client')
  client = mqtt.connect(host, options)

  client.on('error', (err) => {
    console.log('Connection error: ', err)
    client.end()
  })

  client.on('reconnect', () => {
    console.log('Reconnecting...')
  })

  client.on('connect', () => {
    console.log('Client connected:' + clientId)
  })


  client.on('close', () => {
    console.log(clientId + ' disconnected')
    state = 'Not connected to MQTT server'
  })


} 