<script>
	import { Router, Route, Link } from "svelte-routing";
	import Server from "./pages/Server.svelte";
	import Client from "./pages/Client.svelte";
	export let url = "" //This property is necessary declare to avoid ignore the Router
  </script>

<Router url="{url}">
	<nav>
	   <Link to="/">Server</Link>
	   <Link to="client">Client</Link>
	 </nav>
	 <div>
	   <Route path="client"><Client /></Route> 
	   <Route path="/"><Server /></Route>
	 </div>
   </Router>