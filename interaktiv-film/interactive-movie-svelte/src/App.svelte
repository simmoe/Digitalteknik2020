<script>
	import {fade, slide, blur} from 'svelte/transition'
	let position = 0
	let video
	let track = ''

	import {script} from './script.js'
	let ended,currentTime,paused

	$: track = track + ' - ' + script[position].title 
	$: isPlaying =  currentTime > 0 && !ended && !paused
	$: showChoice = ended && !isPlaying

	const next = async (answer) => {
		position = answer.destination
		video.src = script[position]
		video.addEventListener('loadeddata', ()=>{
			if(video.readyState >= 2) {
    			video.play();
			}
		})
	}
	const handleKeys = (e) => {
		if(e.key == 'f'){
			e.target.requestFullscreen()
		}
	}

</script>
<svelte:window on:keypress={handleKeys} />
<main>
	<div class="info">{track}</div>
	<video
	bind:this={video}	
	controls
	src={script[position].clip}
	bind:ended
	bind:currentTime
	bind:paused
	><track kind='captions'></video>

	{#if position == 0 && !isPlaying && !showChoice} 
		<div class="title" on:click={video.play()} in:slide={{delay:1000}} out:fade>
				<h1>{script[position].title}</h1>
				<div>{@html script[position].subtitle}</div>
				{#if script[position].action}
					<p on:click={()=>next(script[position].action)}>{script[position].action.title}</p>
				{/if}
		</div>
	{/if}
	{#if showChoice}
		<div class="choice" in:blur out:fade>
			<h1>{script[position].question}</h1>
			{#each script[position].answers as answer, index}
				<h4 on:click={()=>next(answer)}>{answer.title}</h4>
			{/each}
		</div>
	{/if}
</main>

<style>
	.info{
		position:absolute;
		display:grid;
		place-items:center;
		right:0;
		bottom:0;
		width:100vw;
		height:2vh;
		background:white;
		color:gray;
		font-size: .8rem;
		z-index: 1;
	}
	main {
		width:100vw;
		height:100vh;
		position:relative;
		overflow: hidden;
		display:grid;
		place-items:center;
	}
	video{
		width:100%;
		height:100%;
		object-fit:cover;
	}
	.title, .choice{
		position:absolute;
		height:80vh;
		width:80vw;
		padding:10rem;
		cursor:pointer;
	}
	.title{
		background:rgba(255,255,255,.6);
	}
	.choice{
		background:rgba(0,0,0,.6);
		color:white;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>