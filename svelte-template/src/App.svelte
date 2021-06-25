<script>
	let counter = 10
	const hejsa = () => { counter++}
	$: reactive = counter/2

</script>

bind:scrollTopH={variable}
<main>
	<h1>Digital Teknik 2020</h1>
	<input type="button" on:click={hejsa}>
	<div >{counter}</div>
	<div >{reactive}</div>
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