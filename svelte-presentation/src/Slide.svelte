<script>
    import { scale } from 'svelte/transition'
    export let content
    export let end
</script>

<div in:scale class='slide {end && 'end'}' on:click={ () => content.link ? window.open(content.link): ''}>
    {#if content.title}
        <h1>{@html content.title}</h1>
    {/if}
    {#if content.text}
        <h2>{@html content.text}</h2>
    {/if}
    {#if content.code}
        <pre><code>{content.code}</code></pre>
    {/if}
    {#if content.img}
        <img src={content.img} alt='her er jeg'>
    {/if}
    {#if content.vid}
        <video autoplay muted>
            <source src="{content.vid}" type="video/mp4">
        </video>
    {/if}
</div>

<style>
    .end{
        display:grid;
        place-items:center;
        background-color:lightgray;
        height:60vh;
        border-radius:4px;
        box-shadow: 0 0 8px 2px lightgray;
        animation: away 1s forwards;
    }
    @keyframes away {
        from{
            height:60vh;
        }
        to{
            height:0;
        }
    }
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		text-align:center;
	}
    h2{
        font-weight:normal;
    }
    h1, h2{
        word-wrap: break-word;
    }
    code{
        font-size:1.5rem;
    }

    :global(li){
        padding:.6rem 0 .2rem 0;
    }
    :global(script){
        display:block;
        color:black;
    }
	.slide{
		width:80vw;
		display:grid;
		align-items:center;
		justify-content:center;
	}
	img, video{
		width:80vw;
        /* height:80vh;
        object-fit:cover;
        object-position: top; */
	}
    @media (max-width: 640px) {
		h1 {
			font-size:2.2rem;
		}
        h2{
            font-size:1rem;
        }
        .slide{
            max-width:100vw;
            padding:2rem;
        }
	}

</style>