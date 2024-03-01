<script lang="ts">
	import { onMount } from 'svelte';
	import HeaderComponent from '../components/HeaderComponent.svelte';
	import currentUser from '../datas/users/user';
	import { ResetProperties } from '../datas/users/useractivies';
	import { IsNullOrEmpty } from '../datas/emptychecker';
	onMount(async () => {
		document.title = 'Arcadia Fansub';

		ResetProperties();
	});
</script>

{#key currentUser.isLoggedIn === true}
	<HeaderComponent />
{/key}
<slot />
