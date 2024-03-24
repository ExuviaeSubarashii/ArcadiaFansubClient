<script lang="ts">
	import { onMount } from 'svelte';
	import { pageCount } from '../datas/stores';
	import { writable } from 'svelte/store';

	let previousPage;
	let nextPage;

	function PreviousPageHandle() {
		pageCount.update((n) => {
			const newValue = n - 1;
			if (newValue < 0) {
				return 0;
			}
			return newValue;
		});

		pageCount.subscribe((value) => {
			previousPage = value;
			window.location.href = `/sort/${value}`;
		});
	}

	function NextPageHandle() {
		pageCount.update((n) => n + 1);

		pageCount.subscribe((value) => {
			nextPage = value;
			window.location.href = `/sort/${value}`;
		});
	}
</script>

<div class="column float-end">
	<button on:click={() => PreviousPageHandle()} type="button" class="btn btn-outline-primary"
		>Previous</button
	>
	<button on:click={() => NextPageHandle()} type="button" class="btn btn-outline-secondary"
		>Next</button
	>
</div>
