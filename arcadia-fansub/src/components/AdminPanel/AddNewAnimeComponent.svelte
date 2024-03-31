<script lang="ts">
	import { onMount } from 'svelte';
	import type { AddAnime, AllMember, Member } from '../../types/types';
	import { GetAllMembers } from '../../datas/members/members';
	import { AddAnimeFunction, UploadImage } from '../../datas/animes/addAnime';
	import { IsNullOrEmpty } from '../../datas/emptychecker';

	let animeName: any;
	let episodeAmount: any;
	let editor: any;
	let translator: any;
	let releaseDate: any;
	// let imageLink: any;
	let members: Member[] = [];
	let allMembers: AllMember = {
		translators: [],
		editors: [],
		coders: [],
		admins: [],
		uploaders: []
	};
	let selectedImage: FormData;
	let editorExists: boolean = false;
	let translatorExists: boolean = false;
	let files: any;

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
			// imageLink: imageLink
		};
		await AddAnimeFunction(addAnime);
		sendimage();
	}
	function sendimage() {
		if (files) {
			let fd = new FormData();
			fd.append('form', files[0]);
			UploadImage(fd);
		}
	}
</script>

<div class="fullbody mt-3">
	<div class="input-group mb-3 gap-3">
		<input
			type="text"
			class="form-control"
			bind:value={animeName}
			placeholder="Seri Adı"
			aria-label="Links"
			aria-describedby="basic-addon2"
		/>
	</div>
	<div class="input-group mb-3 gap-3">
		<input
			type="text"
			class="form-control"
			bind:value={episodeAmount}
			placeholder="Bölüm Sayısı"
			aria-label="Links"
			aria-describedby="basic-addon2"
		/>
	</div>
	<div class="input-group mb-3 gap-3">
		<label for="editor">Editör Adı</label>
		<input
			type="checkbox"
			on:click={() => {
				editorExists = !editorExists;
			}}
		/>
		{#if !editorExists && allMembers.editors.length > 0}
			<select bind:value={editor}>
				<option value="">Editör Seçin</option>
				{#if allMembers.editors}
					{#each allMembers.editors as editorItem}
						<option value={editorItem.memberName}>{editorItem.memberName}</option>
					{/each}
				{/if}
			</select>
		{:else}
			<input
				type="text"
				class="form-control"
				bind:value={editor}
				placeholder="Editör Adı"
				aria-label="Links"
				aria-describedby="basic-addon2"
			/>
		{/if}
	</div>
	<div class="input-group mb-3 gap-3">
		<label for="translator"> Çevirmen Adı </label>
		<input
			type="checkbox"
			on:click={() => {
				translatorExists = !translatorExists;
			}}
		/>
		{#if !translatorExists && allMembers.translators.length > 0}
			<select bind:value={translator}>
				<option value="">Çevirmen Seçiniz</option>
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
				placeholder="Çevirmen Adı"
				aria-label="Links"
				aria-describedby="basic-addon2"
			/>
		{/if}
	</div>
	<!-- <div class="input-group mb-3">
		<input
			type="text"
			class="form-control"
			bind:value={imageLink}
			placeholder="Görsel Bağlantısı"
			aria-label="Links"
			aria-describedby="basic-addon2"
		/>
	</div> -->
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
	<div class="d-flex justify-content-center" style="position: relative; margin-top:30px;">
		<h6>Eğer Editör ve Çevirmen adında aradığınız üye yoksa yanındaki tuşa tıklayarak yazın.</h6>
		<button
			class="btn btn-light text-center"
			on:click={() => {
				if (
					IsNullOrEmpty(animeName) === false ||
					IsNullOrEmpty(episodeAmount) === false ||
					IsNullOrEmpty(editor) === false ||
					IsNullOrEmpty(translator) === false ||
					IsNullOrEmpty(releaseDate) === false //||
					// IsNullOrEmpty(imageLink) === false
				) {
					SendAddAnimeRequest();
				}
			}}
			disabled={!animeName||!episodeAmount||!editor||!translator||!releaseDate}>Yeni Seri Oluştur</button
		>
	</div>
</div>

<style>
	.fullbody {
		padding: 10px;
		position: relative;
		left: 30%;
		border-style: solid;
		border-radius: 20px;
		width: 700px;
		border-color: blueviolet;
	}
</style>
