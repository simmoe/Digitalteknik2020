<script>
    import {onMount} from 'svelte' 
    import {slide} from 'svelte-native/transitions' 
    export let state

    let player
    let time = 0
    let showButtons = false

    onMount(()=>{
        console.log(player.nativeView.src + " hejsa")
    })
    const play = () => {
        player.nativeView.play()
    }
    const pause = () => {
        player.nativeView.pause()
    }
    let timer = setInterval(()=>{
        showButtons = player.nativeView.getCurrentTime() > 10000
    }, 200)

</script>

<gridLayout transition:slide>
    <videoPlayer
        bind:this={player}
        observeCurrentTime = "true"
        src="https://ddutemplateserver.elev.nextkbh.dk/wordpress/wp-content/uploads/big_buck_bunny.mp4"
        autoplay="true"
        controls="false"
        height="400"
        on:finishedEvent={()=>console.log('finished')}
        >
    </videoPlayer>
    {#if showButtons}
         <flexboxLayout transition:slide class="buttons">
             <button class="-primary" on:tap={()=>{
                    clearInterval(timer);
                    pause();
                    state=1;
                }}>ok</button> 
             <button class="-primary" on:tap={play}>start</button> 
             <button class="-primary" on:tap={pause}>pause</button> 
         </flexboxLayout>
    {/if}
</gridLayout>

<style>
    .buttons{
        height:60;
    }
</style>

