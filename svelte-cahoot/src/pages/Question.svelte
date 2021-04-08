<script>
    export let data
    export let timeUp
    console.log(data)
</script>

<h1>{data.question}</h1>
<div class="answers">
{#each data.answers as item, index}
     <div class="answer {timeUp && item.correct && 'active'}">
       <div class="number">{index+1}</div>
       <div>{item.text}</div>
   </div>
{/each}
</div>


<style>
    .answers{
		display:grid;
		grid-template-columns:repeat(4, 1fr);
		gap:1rem;
	}
	.answer{
		position:relative;
		border:1px dotted gray;
		border-radius: 1rem;
		display:grid;
		place-items:center;
		font-weight:bold;
		font-size:2rem;
        transition:all .5s ease-in-out;
	}
    .active{
        border-width:1rem;
    }
	.number{
		position:absolute;
		left:.5rem;
		top:.5rem;
		font-size:15rem;
		color:#f0f1ff;
	}

</style>