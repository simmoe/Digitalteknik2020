let info

function setup() {
  mqttInit()
  createCanvas(400, 400);
  background(0);
  info = createElement('div')
}
function draw() {
  // Nothing
}

const mqttInit = () => {
  const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
  const host = 'ws://test.mosquitto.org:8080'

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
  const client = mqtt.connect(host, options)

  client.on('error', (err) => {
    console.log('Connection error: ', err)
    client.end()
  })

  client.on('reconnect', () => {
    console.log('Reconnecting...')
  })

  client.on('connect', () => {
    console.log('Client connected:' + clientId)
    client.subscribe('info_123', { qos: 0 })
    client.publish('info_123', 'ws connection demo...!', { qos: 0, retain: false })
  })

  client.on('message', (topic, message, packet) => {
    console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
    info.html('Status: ' + message.toString() + ' med emnet: ' + topic) 
  })

  client.on('close', () => {
    console.log(clientId + ' disconnected')
  })


} 