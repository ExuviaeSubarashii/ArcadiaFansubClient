<script lang="ts">
	import { onMount } from 'svelte';
	import HeaderComponent from '../components/Layout/HeaderComponent.svelte';
	import currentUser from '../datas/users/user';
	import { ResetProperties } from '../datas/users/useractivies';
	import { IsNullOrEmpty } from '../datas/emptychecker';
	onMount(async () => {
		document.title = 'Arcadia Fansub';

		ResetProperties();
	});
</script>
{#key currentUser}
	
{#key currentUser.isLoggedIn === true}
<HeaderComponent />
{/key}
{/key}
<slot />
