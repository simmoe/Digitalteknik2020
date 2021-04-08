let client 
const clientId = 'anonymous-' + Math.random().toString(16).substr(2, 8)
const host = 'wss://test.mosquitto.org:8081'
let members = []
let infoDiv, membersList
let state = "waitingroom"
let data  
let position = 0

function preload() {
  data = loadJSON("quiz.json");
}

function setup() {
  createCanvas(displayWidth, displayHeight)
  mqttInit()
  waitingRoom()
  console.log(data.description)

  //subscribe to videochannel
  client.subscribe('socket-cahoot')

  //handle MQTT messages
  client.on('message', async (topic, message, packet) => {
    message = await JSON.parse(message)
    console.log(message)
    if(topic.includes('socket-cahoot') && message.type == 'vote'){
      let exist = members.find(member => member.id == message.id)
      if(exist) { exist.vote1=message.vote1 }
    }
    if(topic.includes('socket-cahoot') && message.type == 'member'){
      let exist = members.find(member => member.id == message.id)
      if(!exist) {
        members.push(message) 
        message.type = 'connected'
        client.publish('socket-cahoot', JSON.stringify(message))
        str = ""
        members.map(member => {
          console.log('show members', members)
          str = str + "<li>" + member.name + "</li>"
        })
        membersList.html(str)  
      }
    }
  })
}

function draw() {
}

const gameControl = () => {
  let message = {type:'question', question:data.content[position]}
  client.publish('socket-cahoot', JSON.stringify(message))
}

const waitingRoom = () => {
  infoDiv = createDiv().class('container v-container')
  let info = createDiv('Venter på spillere..')
  startBtn = createButton('begynd')
  membersList = createDiv()
  infoDiv.child(info)
  infoDiv.child(membersList)
  infoDiv.child(startBtn)
  startBtn.mouseReleased(()=>{
    infoDiv.html('play')
    startBtn.hide()
    gameControl()
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