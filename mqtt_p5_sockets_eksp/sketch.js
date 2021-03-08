//game control
let state = 'ready' //ready, running, stopped, finished
//m5 stick objects
let m51, m52, m53
//timer object
let t, startMillis
//buttons
let beginBtn, resetBtn, info

function setup() {
  createCanvas(displayWidth, displayHeight)
  //init m5 objects
  m51 = new m5Obj('m51', false, '0', 100, 100)
  m52 = new m5Obj('m52', false, '0', 100, 200)
  m53 = new m5Obj('m53', false, '0', 100, 300)
  //init timer object
  t = new timer('0:00', displayWidth/2-100, displayHeight/2)
  //init MQTT communication
  mqttInit()
  //subscribe to m5stacks
  client.subscribe('m5stickc1')
  client.subscribe('m5stickc2')
  client.subscribe('m5stickc3')
  client.subscribe('m5/+')
  //handle MQTT messages
  client.on('message', (topic, message, packet) => {
    console.log('received ' + topic + " ms: " + message)
    if(topic.includes('m5stick') && state == 'running'){
      if(topic == "m5stickc1" && message == 'on') {
        m51.on = true 
        m51.time = t.time
        m51.millis = new Date().getTime() % startMillis 
      }
      if(topic == "m5stickc2" && message == 'on') {
        m52.on = true 
        m52.time = t.time 
        m52.millis = new Date().getTime() % startMillis 
      }
      if(topic == "m5stickc3" && message == 'on') {
        m53.on = true 
        m53.time = t.time 
        m53.millis = new Date().getTime() % startMillis 
      }  
    }
    if(topic == 'm5/begin'){
      begin()
    }
    if(topic == 'm5/reset'){
      reset()
    }
  })
  //setup interface
  info = createDiv()
  info.position(20, displayHeight-200) 
  info.html(state)
  beginBtn = createButton('start')
  beginBtn.position(50,400)
  beginBtn.mouseClicked(begin)
  resetBtn = createButton('reset')
  resetBtn.position(200,400)
  resetBtn.mouseClicked(reset)
}

function begin(){
  if(state=="running"){
    state = 'stopped'
    beginBtn.html('start')
  }else{
    beginBtn.html('stop')
    startMillis = new Date().getTime()
    state = "running"
  }
}

function reset(){
  console.log('resetting')
  state = 'ready'
  beginBtn.html('start')
  client.publish('m5control', 'reset')
  m51.on = false
  m52.on = false
  m53.on = false
  m51.win = false
  m52.win = false
  m53.win = false
  loop()
}

function finished(){
  let winner = m51
  if(m52.millis < winner.millis) winner = m52
  if(m53.millis < winner.millis) winner = m53
  winner.win = true
  winner.show()
  noLoop()
}

function draw() {
  background('lightblue')
  m51.show()
  m52.show()
  m53.show()
  //handle game end
  if(m51.on && m52.on && m53.on){
    state = "finished"
  }
  if(state == 'running'){
    let millisSinceStart = new Date().getTime() % startMillis
    let seconds = Math.round(millisSinceStart / 1000)
    let milliseconds = millisSinceStart % 1000
    t.time = seconds + ':' + milliseconds
  }
  if (state=='finished'){
    finished()
  }
  if (state == 'ready'){
    t.time = '0:00'
  }
  t.show()
  info.html(state)
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