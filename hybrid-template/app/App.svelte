<script lang="typescript">
    import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform"
    
    let message = "Blank Svelte Native App"
    const settings = (o) => {
        console.log(o, "Hejsa")

    // let webView = <webView>args.object;

    if (isAndroid) {
        setTimeout(() => {
           let androidWebView = webView.nativeView; // android.webkit.WebView
           androidWebView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        }, 100);
    }
}

</script>

<page>
    <actionBar title="Svelte Native App"/>
    <gridLayout>
        <webView on:loadFinished={settings} src='https://ddutemplateserver.elev.nextkbh.dk/wordpress/' />
    </gridLayout>
</page>

 
<style>
    .info {
        font-size: 20;
    }
</style>


