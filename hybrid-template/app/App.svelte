<script lang="typescript">
    let message = "Blank Svelte Native App"
</script>

<page>
    <actionBar title="Hybrid app" />
    <gridLayout verticalAlignment="center">
        <label text={message} class="info text-center"/>
    </gridLayout>
</page>

<style>
    .info {
        font-size: 20;
    }
</style>


