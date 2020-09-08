<script>
	import {fade, slide, blur} from 'svelte/transition'
	let position = 0
	let video
	let showInfo = false
	let track = ''

	import {script} from './script.js'
	let duration, buffered, played, seekable, seeking, ended,currentTime,playbackRate, paused, volume, muted, videoWidth, videoHeight

	$: track = track + ' - ' + script[position].title 
	$: isPlaying =  currentTime > 0 && !ended && !paused
	$: showTitle = !isPlaying && !ended
	$: showChoice = ended
	$: showWall = false

	const next = async (answer) => {
		showWall = true
		position = answer.destination
		video.src = script[position]
		setTimeout(()=>showWall = false, 2000)
	}
	const handleKeys = (e) => {
		if(e.key == 'i'){
			showInfo = !showInfo
		}
		if(e.key == 'f'){
			e.target.requestFullscreen()
		}
	}

</script>
<svelte:window on:keypress={handleKeys} />
<main>
	{#if showInfo}
		<div class="info"><h5>{track}</h5></div>
	{/if}
	<video
	bind:this={video}	
	controls
	src={script[position].clip}
	bind:ended
	bind:currentTime
	bind:paused
	bind:duration
	>
		<track kind='captions'>
	</video>

	{#if showTitle }
		<div class="title" in:slide={{delay:1000}} out:fade>
				<h1>{script[position].title}</h1>
				<p on:click={video.play()}>{script[position].subtitle}</p>
				{#if script[position].action}
					<p on:click={()=>next(script[position].action)}>{script[position].action.title}</p>
				{/if}
		</div>
	{/if}
	{#if showChoice}
		<div class="choice" in:blur out:fade={{delay:1000}}>
			<h1>{script[position].question}</h1>
			{#each script[position].answers as answer, index}
				<h4 on:click={()=>next(answer)}>{answer.title}</h4>
			{/each}
		</div>
	{/if}
	{#if showWall}
		<div class="wall" transition:fade><h1>The wall</h1></div>
	{/if}
</main>

<style>
	:global(body, html){
		margin:0;
		padding:0;
	}
	:global(*){
		box-sizing:border-box;
	}
	.info{
		position:absolute;
		right:0;
		bottom:0;
		width:100vw;
		padding:1rem;
		background:white;
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
	.wall{
		position:absolute;
		color:white;
		display:grid;
		place-items:center;
		width:100%;
		height:100%;
		background:black;
	}
	.title, .choice{
		position:absolute;
		height:80vh;
		width:80vw;
		padding:10rem;
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