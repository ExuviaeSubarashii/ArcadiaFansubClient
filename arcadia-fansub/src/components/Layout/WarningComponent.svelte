<script lang="ts">
	import { onMount } from 'svelte';
	import { warnings } from '../../datas/warnings/warnings';
	let currentWarning = {
		id: 0,
		message: ''
	};
	function setWarnings() {
		currentWarning.id++;
		if (currentWarning.id >= warnings.length) {
			currentWarning.id = 0;
		}
		currentWarning.message = warnings[currentWarning.id].description;
	}

	onMount(() => {
		setWarnings();
		setInterval(setWarnings, 10000);
	});
</script>

<div>
	<h1 style="color:white; font-size: medium; width:200px; overflow:visible">
		{currentWarning.message}
	</h1>
</div>

<style>
</style>
