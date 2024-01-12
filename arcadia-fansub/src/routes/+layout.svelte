<script lang="ts">
	import { onMount } from "svelte";
	import HeaderComponent from "../components/HeaderComponent.svelte";
	import currentUser from "../datas/users/user";
	import ResponseMessageComponent from "../components/ResponseMessageComponent.svelte";
	import { responseMessageStore } from "../datas/variables";
	
	onMount(()=>{
		document.title="Arcadia Fansub";
	})
</script>

{#key currentUser.isLoggedIn===true}
<HeaderComponent/>
{/key}
<slot/>
