let client 
let light

function setup() {
  createCanvas(displayWidth, displayHeight)
  mqttInit()
  client.publish('m5/status', 'Connection from webpage')
  createElement('p', 'Lys sensor får data fra M5 over MQTT')
  light = createElement('h1', '0')
  client.subscribe('m5/sensor/light')
  client.on('message', (topic, message, packet) => {
    console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
    if(topic == 'm5/sensor/light'){
      light.html(message)
    }
  })
}
function draw() {
  clear() 
  background(153)
  let val = map(light.html(), 0, 1000, 0, 255)
  noStroke()
  fill(255,0,0,val)
  ellipse(displayWidth/2, 400, 400)
}






const mqttInit = () => {
  //opret unikt id 
  const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
  const host = 'wss://test.mosquitto.org:8081'

  const options = {
    keepalive: 30,
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
  })


} 