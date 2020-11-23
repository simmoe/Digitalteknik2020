<script>
let message = "Blank Svelte Native App"
</script>

<page>
    <actionBar title="Svelte Native App"/>
    <gridLayout>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label 
            class="info" 
            horizontalAlignment="center" 
            verticalAlignment="middle" 
            textWrap="true"
            text={message}
        />
    </gridLayout>
</page>


<style>
    .info {
        font-size: 20;
    }
</style>


