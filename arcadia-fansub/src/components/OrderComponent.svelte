<script lang="ts">
	import { onMount } from 'svelte';
	import { pageCount } from '../datas/stores';
	import { GetPageAmount } from '../datas/episodes/getepisodes';

	const alphabet = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	];
	let numbers: number;

	let letter: any;
	let pageNumber: number;
	onMount(async () => {
		numbers = await GetPageAmount();
	});
	function handleAlphabet(letter: any) {
		window.location.href = `/anime/${letter}`;
	}
	function handlePage(num: any) {
		window.location.href = `/sort/${num}`;
	}
</script>

<div class="fullbody mt-3">
	<div class="mt-3 ms-5 row d-flex g-0">
		<select
			class="form-select mb-3"
			style="width: 5%;"
			bind:value={letter}
			on:change={() => handleAlphabet(letter)}
		>
			{#each alphabet as letter}
				<option value={letter}>{letter}</option>
			{/each}
		</select>
		<select
			class="form-select mb-3"
			style="width: 8%;"
			bind:value={pageNumber}
			on:change={() => handlePage(pageNumber)}
		>
			{#each Array(numbers) as num, i}
				{#if i !== 0}
					<option value={i}>{i}. Sayfa</option>
				{/if}
			{/each}
		</select>
	</div>
</div>
