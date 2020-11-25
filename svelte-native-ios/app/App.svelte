<script>
    import {slide} from 'svelte-native/transitions' 
    import Intro from './components/Intro.svelte'
    import Movie from './components/Movie.svelte'
    let state = 2
</script>

<page>
    <actionBar title="Svelte Native Video" />
    {#if state == 1}
        <Intro bind:state={state} />
    {/if}
    {#if state == 2}
        <Movie bind:state={state} />
    {/if}

</page>
<style>
</style>
