<script lang="ts">
	import { onMount } from 'svelte';
    import ProfileComponent from '../../../components/ProfileComponent.svelte';
	import type { Animes, UserProfile } from '../../../types/types';
import type { PageData } from './$types';
	import { GetUserProfile } from '../../../datas/users/profile';
	import { GetSpecificAnime } from '../../../datas/animes/getanimes';
    
    export let data: PageData;
    let userId=data.props.userdata.userId;
</script>
<ProfileComponent userName={userId}/>
