<script lang="typescript">
    let selectedTab = 0
</script>

<page>
    <actionBar title="Svelte Native App" />

    <bottomNavigation bind:selectedIndex={selectedTab}>

        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <tabStrip>
            <tabStripItem>
                <label text="Home" />
                <image src="font://&#xf015;" class="fas t-36" />
            </tabStripItem>
            <tabStripItem class="special">
                <label text="Verdens historie" />
                <image src="font://&#xf007;" class="fas t-36" />
            </tabStripItem>
            <tabStripItem class="om">
                <label text="Search" />
                <image src="font://&#xf00e;" class="fas t-36" />
            </tabStripItem>
        </tabStrip>
    
        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <tabContentItem>
            <gridLayout>
                <label text="Home Page" class="h2 text-center" />
            </gridLayout>
        </tabContentItem>
        <tabContentItem>
            <gridLayout>                
                <!-- <label text="Home Page" class="h2 text-center" /> -->
                <webView src="https://xd.adobe.com/view/b3ae08d0-f159-47bf-8253-eeb9db00bd5d-e6fd/screen/e91fe770-58d0-4338-9b4a-a881522c7c75?fullscreen" />
            </gridLayout>
        </tabContentItem>
        <tabContentItem>
            <gridLayout>
                <label text="Search Page" class="h2 text-center" />
            </gridLayout>
        </tabContentItem>
    
    </bottomNavigation>
</page>


<style>
</style>


<!-- 
info.plist

	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
	</dict>


 -->