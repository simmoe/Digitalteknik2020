<page>
    <actionBar title="Svelte Native App" />
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

<script lang="typescript">
    let message: string = "Blank Svelte Native App"
</script>

<style>
    .info {
        font-size: 20;
    }
</style>


