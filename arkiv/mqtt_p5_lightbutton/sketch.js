let lightValue = 0

function setup() {
  createCanvas(displayWidth, displayHeight)
  //init MQTT communication
  mqttInit()
  //subscribe to m5stacks
  client.subscribe('hiM5')
  //handle MQTT messages
  client.on('message', (topic, message, packet) => {
    if(topic.includes('hiM5')) {
      lightValue = message
    }
  })
  //setup interface
}

function draw(){
  background(0)
  console.log('light value from drw: ', lightValue.toString()/10)
  fill(255,255,255,lightValue.toString()/10)
  text('value: ' + lightValue.toString(), 50,50)
  ellipse(displayWidth/2, displayHeight/2, 400,400)
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