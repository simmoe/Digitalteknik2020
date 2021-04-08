<script>
	import {quiz} from './quiz'
	import Question from './Question.svelte'
	import {mqttConnection} from './mqtt'
	let position = 0
	let state = 'startPlaying' 			//end, waitforplayers
	let time = 5
	setInterval( ()=>time--, 1000)

	const mqttInit = () => {
		let client = mqttConnection()
		client.on('message', (topic, message) => {
	        console.log('Received Message: ' + message + ' -from topic: ' + topic)
    	})

		client.subscribe('my-wonderful-channel')
		client.publish('my-wonderful-channel', 'hej siman')
	}

	$: if(time == 0){
		state = 'end'
	}

</script>


<svelte:head>
	<script on:load = {()=>mqttInit()} src="https://cdnjs.cloudflare.com/ajax/libs/mqtt/4.2.6/mqtt.min.js" crossorigin="anonymous"></script>
</svelte:head>

<main>
	{#if state == 'startPlaying'}
		 <div class="timer">{time}</div>
		 <Question data={quiz[position]} timeUp={false}/>
	{/if}
	{#if state == 'end'}
		 <h1>Time up</h1>
		 <Question data={quiz[position]} timeUp={true}/>
	{/if}

</main>

<style>
	main {
		height:100vh;
		width:100vw;
		display:grid;
		grid-template-rows: 2fr 2fr 8fr;
		padding:4rem;
	}
	.timer{
		font-size: 12rem;
		transition:all .3s ease-in-out;
		color:lightgray;
	}

	:global(*){
		box-sizing:border-box;
	}
</style>