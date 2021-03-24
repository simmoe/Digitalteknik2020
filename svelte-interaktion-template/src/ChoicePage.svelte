<script>
    import { scale } from 'svelte/transition'
    export let choices
    export let pos
    export let history

    const vote = (choice) => {
        pos = pos + 1
        history = [...history, choice]
    }
    
</script>

<div class='choices'>
    {#each choices as choice}
        <div in:scale on:click={()=>vote(choice)} class='choice' style={choice.col ? 'background:' + choice.col : ''}>{choice.q}</div>
    {/each}
</div>


<style>
    .choices{
        width:100vw;
        display:grid;
        grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));
        place-items:center;
        gap:2rem;
    }
    .choice{
        width:200px;
        height:200px;
        background:orangered;
        color:white;
        font-size: 3rem;
        display:grid;
        place-items:center;
        border-radius: 50%;;
    }
</style>