<script lang="ts">
	import { onMount } from 'svelte';
	import { AddAnimeFunction } from '../datas/animes/addAnime';
	import { IsNullOrEmpty } from '../datas/emptychecker';
	import { GetAllMembers } from '../datas/members/members';
	import type { AddAnime, AllMember, Member } from '../types/types';

	let animeName: any;
	let episodeAmount: any;
	let editor: any;
	let translator: any;
	let releaseDate: any;
	let imageLink: any;
	let members: Member[] = [];
	let allMembers: AllMember = {
		translators: [],
		editors: [],
		coders: [],
		admins: [],
		uploaders: []
	};
	let editorExists: boolean = false;
	let translatorExists: boolean = false;

	onMount(async () => {
		members = await GetAllMembers();
		if (members) {
			allMembers = {
				translators: members.filter((member) => member.memberRole.includes('Çevirmen')),
				editors: members.filter((member) => member.memberRole.includes('Editör')),
				coders: members.filter((member) => member.memberRole.includes('Kodlama')),
				admins: members.filter((member) => member.memberRole.includes('Admin')),
				uploaders: members.filter((member) => member.memberRole.includes('Yükleme'))
			};
		}
	});
	async function SendAddAnimeRequest() {
		const addAnime: AddAnime = {
			animeName: animeName,
			animeEpisodeAmount: episodeAmount,
			editor: editor,
			translator: translator,
			releaseDate: releaseDate,
			imageLink: imageLink
		};
		await AddAnimeFunction(addAnime);
	}
</script>

<div class="mt-3" id="fullbody">
	<div class="input-group mb-3">
		<input
			type="text"
			class="form-control"
			bind:value={animeName}
			placeholder="Seri Adı"
			aria-label="Links"
			aria-describedby="basic-addon2"
		/>
	</div>
	<div class="input-group mb-3">
		<input
			type="text"
			class="form-control"
			bind:value={episodeAmount}
			placeholder="Bölüm Sayısı"
			aria-label="Links"
			aria-describedby="basic-addon2"
		/>
	</div>
	<div class="input-group mb-3">
		<label for="editor">Editör Adı</label>
		<input
			type="checkbox"
			on:click={() => {
				editorExists = !editorExists;
			}}
		/>
		{#if !editorExists}
			<select bind:value={editor} on:change={() => console.log(editor)}>
				{#if allMembers.editors}
					{#each allMembers.editors as editor}
						<option value={editor.memberName}>{editor.memberName}</option>
					{/each}
				{/if}
			</select>
		{:else}
			<input
				type="text"
				class="form-control"
				bind:value={editor}
				on:input={()=>console.log(editor)}

				placeholder="Editör Adı"
				aria-label="Links"
				aria-describedby="basic-addon2"
			/>
		{/if}
	</div>
	<div class="input-group mb-3">
		<label for="translator">Çevirmen Adı</label>
		<input
			type="checkbox"
			on:click={() => {
				translatorExists = !translatorExists;
			}}
		/>
		{#if !translatorExists}
			<select bind:value={translator} on:change={() => console.log(translator)}>
				{#if allMembers.translators}
					{#each allMembers.translators as translator}
						<option value={translator.memberName}>{translator.memberName}</option>
					{/each}
				{/if}
			</select>
		{:else}
			<input
				type="text"
				class="form-control"
				bind:value={translator}
				on:input={()=>console.log(translator)}
				placeholder="Çevirmen Adı"
				aria-label="Links"
				aria-describedby="basic-addon2"
			/>
		{/if}
	</div>
	<div class="input-group mb-3">
		<input
			type="text"
			class="form-control"
			bind:value={imageLink}
			placeholder="Görsel Bağlantısı"
			aria-label="Links"
			aria-describedby="basic-addon2"
		/>
	</div>
	<div class="input-group mb-3">
		<input
			type="date"
			class="form-control"
			bind:value={releaseDate}
			placeholder="Yayınlanma Tarihi"
			aria-label="Links"
			aria-describedby="basic-addon2"
		/>
	</div>
	<div class="d-flex justify-content-center">
		<h6>Eğer Editör ve Çevirmen adında aradığınız üye yoksa yanındaki tuşa tıklayarak yazın.</h6>
		<button
			class="btn btn-light text-center"
			on:click={() => {
				if (
					IsNullOrEmpty(animeName) === false ||
					IsNullOrEmpty(episodeAmount) === false ||
					IsNullOrEmpty(editor) === false ||
					IsNullOrEmpty(translator) === false ||
					IsNullOrEmpty(releaseDate) === false ||
					IsNullOrEmpty(imageLink) === false
				) {
					SendAddAnimeRequest();
				}
			}}>Yeni Seri Oluştur</button
		>
	</div>
</div>

<style>
	#fullbody {
		padding: 10px;
		position: relative;
		left: 30%;
		border-style: solid;
		border-radius: 20px;
		width: 700px;
		height: 380px;
		border-color: blueviolet;
	}
</style>
