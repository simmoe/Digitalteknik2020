<script>
	import {choices} from './choices'
	import ChoicePage from './ChoicePage.svelte'

	let history = []
	let pos = 0
	let w = 0
	let end = false
	let waitForTransition = false

	const handleKeydown = (event) => {
		switch(event.key){
			case 'ArrowRight': pos = pos < choices.length-1 ? pos +1 : 0; break;
			case 'ArrowLeft': pos = pos > 0 ? pos -1 : choices.length -1; break;
		}
	}

	$: {
		pos //the reactive declaration is fired every time pos changes
		w = (100 / (choices.length-1)) * pos //progress
		waitForTransition = true
		setTimeout( () => waitForTransition = false, 40)
	}

</script>

<svelte:window on:keydown={handleKeydown}/>
<header style='width:{w}%'><title>Simon</title></header>

<main>
	{#if !waitForTransition}
		{#if choices[pos]!= 'end'}
			<!-- content here -->
			<ChoicePage choices={choices[pos]} bind:pos bind:history/>
		{:else}
			<div>
				<h1>End</h1>
				<div class="button" on:click={()=>{history=[];pos=0;end=false;}}>try again</div>
			</div>
		{/if}
	{:else}
		 <!-- else content here -->
		 <p/>
	{/if}
	<footer>
		{#each history as choice}
			<div class="history-choice" style={choice.col ? 'background:' + choice.col : ''}>{choice.q}</div>
		{/each}
	</footer>
</main>

<style>
	:global(body, html){
		margin:0;
		padding:0;
		box-sizing: border-box;		
	}
	header{
		height:2vh;
		position:fixed;
		background: #ff3e00;
		transition:all 1s ease;
		width: 1vw;
	}
	footer{
		height:12rem;
		width:100vw;
		background:rgba(230,230,230, .5);
		position:fixed;
		bottom:0;
		left:0;
		display:grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		align-items: center;
		justify-content: start;
		gap:2rem;
		padding:0 2rem 0 2rem;
	}
	.history-choice, .button{
		height:4rem;
		max-width:6rem;
		display:grid;
		place-items:center;
		border-radius:8px;
		padding:0 2rem;
		background:orangered;
		color:white;
	}
	.button{
		cursor:pointer;
	}
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