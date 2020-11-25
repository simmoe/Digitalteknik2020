<script>
    export let state
</script>

<gridLayout>
    <button class="-primary" on:tap={() => 
        {
            console.log('alive')
            state = state + 1
        }
    }>state</button>
</gridLayout>

