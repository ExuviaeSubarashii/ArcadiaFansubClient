<script lang="ts">
	import { onMount } from "svelte";
	import HeaderComponent from "../components/HeaderComponent.svelte";
	onMount(()=>{
		document.title="Arcadia Fansub";
	})
</script>
<HeaderComponent/>
<slot/>