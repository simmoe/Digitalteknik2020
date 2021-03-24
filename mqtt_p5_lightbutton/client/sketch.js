let startBtn 

function setup() {
  createCanvas(displayWidth, displayHeight)
  //setup interface
  startBtn = createButton('start')
  startBtn.mouseReleased(()=>{
    client.publish('m5stickc3', 'on')
    startBtn.html('touch down')
  })
  //setup MQTT
  mqttInit()
  client.subscribe('m5control')
  client.on('message', (topic, message, packet) => {
    console.log('client received ' + topic + " ms: " + message)
    if(topic == 'm5control' && message == 'reset'){
      startBtn.html('go') 
    }
  })
}


function draw() {
  background('lightblue')
}


const mqttInit = () => {
  const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
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