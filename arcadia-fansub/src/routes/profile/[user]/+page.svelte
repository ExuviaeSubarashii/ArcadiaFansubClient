<script lang="ts">
	import { onMount } from 'svelte';
    import ProfileComponent from '../../../components/ProfileComponent.svelte';
import type { PageData } from './$types';
    export let data: PageData;
    let userId=data.props.userdata.userId;
</script>
<ProfileComponent userName={userId}/>
