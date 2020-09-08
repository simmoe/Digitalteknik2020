 <script>
// Navigate to `chrome://flags/#unsafely-treat-insecure-origin-as-secure` in Chrome.
// Find and enable the `Insecure origins treated as secure` section (see below).
// Add any addresses you want to ignore the secure origin policy for. Remember to include the port number too (if required)
//npm i svelte-loading-spinners

import * as faceapi from 'face-api.js' 
import { Jumper } from 'svelte-loading-spinners'
import { fade } from 'svelte/transition'

let state = 'load'
let video
let mood = ''

const startVideo = () => {
	state = 'action'
	navigator.mediaDevices.getUserMedia({ audio: false, video: true })
	.then(function(mediaStream) {
	  video.srcObject = mediaStream
	  video.onloadedmetadata = function(e) {
		video.play()
		detect()
	  }
	})
	.catch(function(err) { console.log(err.name + ": " + err.message); })
}

const loadDetection = async () => {
	console.log('loading detection models..')
	await faceapi.loadSsdMobilenetv1Model('/models')
	await faceapi.loadFaceExpressionModel('/models')
	state = 'click'
}

let t

const detect = async () => {
	const useTinyModel = true
	mood=''
	const res = await faceapi.detectSingleFace(video).withFaceExpressions(true)
	if(res){
		mood = res.expressions.asSortedArray()[0].expression
	}
	t = setTimeout(detect, 1000)
}

loadDetection()


</script>

<main>
{#if state=='load'}
	<Jumper size="60" color="#FF3E00" unit="px" />
{/if}
{#if state=='click'}
		<h1 on:click={startVideo}>klik her for at tænde webcam..</h1>
{/if}
{#if state=='action'}
	<div class='video' in:fade>
		<video bind:this={video} />
		<div class='overlay'>{mood}</div>
	</div>
{/if}
</main>


<style>
:global(*){box-sizing:border-box;}
	main {
		height:100vh;
		width:100vw;
		display:grid;
		place-items:center;
		padding: 10vh 10vw 10vh 10vw;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	.video{
		position:relative;
	}
	.overlay{
		position:absolute;
		color:white;
		font-size:4rem;
		left:1rem;
		bottom:2rem;
	}
</style>