<script>

let info

const init_mqtt = () => {
	const clientId = 'test_123'
	console.log('connecting mqtt client')
	const client = mqtt.connect('ws://test.mosquitto.org:8080')

	client.on('connect', () => {
		console.log('Client connected:' + clientId)
		client.subscribe('info_123', { qos: 0 })
		client.publish('info_123', 'ws connection demo...!', { qos: 0, retain: false })
	})

	client.on('message', (topic, message, packet) => {
		console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
		info = message.toString() + ' med emnet: ' + topic
	})
}

</script>

<svelte:head>
	<script src="https://unpkg.com/mqtt/dist/mqtt.min.js" on:load={init_mqtt}></script>
</svelte:head>

<main>
	<h1>Digital Teknik 2020</h1>
	<p bind:this={info}>Status: {info}</p>
</main>

<style>
	main {
		width:100vw;
		height:100vh;
		display:grid;
		place-items:center;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		margin-top:0;
	}
</style>