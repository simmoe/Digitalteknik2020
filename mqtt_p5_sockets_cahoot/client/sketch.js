const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
let state = "connecting"
let infoDiv

function setup() {
  createCanvas(displayWidth, displayHeight)
  createLogin()
  mqttInit()

  client.subscribe('socket-cahoot')
  client.on('message', (topic, message, packet) => {
    message = JSON.parse(message)
    console.log('client received ' + topic + " ms: " + message)
    if(topic=='socket-cahoot' && message.type=="connected" && message.id == clientId){
      infoDiv.html('Connection - velkommen til serveren')
    }
    if(topic=='socket-cahoot' && message.type=="question"){
      infoDiv.html("<h1>" + message.question.q + "</h1>")
      message.question.answers.map((answer)=>{
        console.log(answer)
      })
    }
  })
}


function draw() {
  background('lightblue')
}


const createLogin = () => {
    startBtn = createButton('start')
    nameInput = createInput().attribute('placeholder', 'dit navn..')
    infoDiv = createDiv().class('container h-container')
    infoDiv.child(nameInput)
    infoDiv.child(startBtn)
    startBtn.mouseReleased(()=>{
        myName = nameInput.value()
        const obj = {type:'member', 'name':myName, 'id':clientId}
        client.publish('socket-cahoot', JSON.stringify(obj))
    })  
}
const mqttInit = () => {
  const host = 'wss://test.mosquitto.org:8081'

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