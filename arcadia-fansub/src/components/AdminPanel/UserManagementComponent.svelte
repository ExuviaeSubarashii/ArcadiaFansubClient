<script lang="ts">
	import { onMount } from 'svelte';
	import { AddOrRemoveMemberRole, CreateNewMember, GetAllMembers, GetMemberByQuery } from '../../datas/members/members';
	import { IsNullOrEmpty } from '../../datas/emptychecker';
	import type { CreateNewMemberBody, Member, User } from '../../types/types';
	import PopupModal from '../Modals/PopupModal.svelte';

	let allMembers: Member[] = [];
	onMount(async () => {
		allMembers = await GetAllMembers();
	});
	let RoleName = ['Kodlama', 'Admin', 'Çevirmen', 'Editör', 'Redaktör'];
	let userId: number;
	let newUserId: number;
	let isModalVisible: boolean = false;

	async function HandleRoleRemove(e: any) {
		let selectedRoleName = e.target.value;
		await AddOrRemoveMemberRole(selectedRoleName, userId);
		allMembers = await GetAllMembers();
	}
	function HandleUserName(e: any) {
		userId = e.target.value;
	}

	const newMember: any = {
		newMemberName: String,
		newMemberRole: []
	};
	function AddRoles(e: any) {
		let selectedRoles = document.getElementById(e.target.id) as HTMLButtonElement;
		if (newMember.newMemberRole.includes(e.target.value)) {
			newMember.newMemberRole = newMember.newMemberRole.filter(
				(item: any) => item !== e.target.value
			);
			selectedRoles.style.color = 'black';
		} else {
			newMember.newMemberRole.push(e.target.value);
			selectedRoles.style.color = 'green';
		}
	}
	async function HandleMemberCreation() {
		if (newMember.newMemberRole.length > 0 && IsNullOrEmpty(newMember.newMemberName) === false) {
		
			const newUser: CreateNewMemberBody = {
				memberName: newMember.newMemberName,
				memberRoles: newMember.newMemberRole
			};
		
			await CreateNewMember(newUser);
			isModalVisible = !isModalVisible;
			newMember.newMemberName = '';
			sortingParam = '';
			queriedUsers = [];
			newMember.newMemberRole = [];
			allMembers = await GetAllMembers();
		} else {
			return alert('Kullanıcı adı veya Rol Seçilmemiş!');
		}
	}
	let sortingParam: string;
	let queriedUsers: User[] = [];
	async function HandleUserReceiving() {
		if (IsNullOrEmpty(sortingParam) === false) {
			queriedUsers = await GetMemberByQuery(sortingParam);
		
		}
	}
	let selectedUserButton: HTMLButtonElement;
	function SetSelectedUser(e: any) {
		newUserId = e.currentTarget.dataset.userId;
		if (selectedUserButton) {
			selectedUserButton.style.color = '';
		}
		selectedUserButton = e.currentTarget;
		selectedUserButton.style.color = 'purple';
		newMember.newMemberName = e.target.value;
	}
</script>

{#key isModalVisible}
	<PopupModal bind:showModal={isModalVisible}>
		<div slot="header" class="modal-dialog">
			<h5 class="modal-title">Yeni Ekip Üyesi Oluştur</h5>
		</div>
		<div slot="body" class="modal-content">
			<p>Yeni Üye Oluşturmak İstiyor Musunuz?</p>
			<hr />
			<input
				placeholder="Üye Adı"
				bind:value={sortingParam}
				on:input={async () => HandleUserReceiving()}
			/>
			{#key queriedUsers}
				{#if queriedUsers}
					{#each queriedUsers as user, i}
						<button value={user.userName} data-user-id={i} on:click={(e) => SetSelectedUser(e)}
							>{user.userName}</button
						>
					{/each}
				{/if}
			{/key}
			{#if RoleName}
				{#each RoleName as role, i}
					<li style="display: flex;">
						<button
							class="dropdown-item"
							id={i.toString()}
							value={role}
							on:click={(e) => AddRoles(e)}>{role}</button
						>
					</li>
				{/each}
			{/if}
			<button
				on:click={() => HandleMemberCreation()}
				>Oluştur</button
			>
		</div>
	</PopupModal>
{/key}
{#if allMembers}
	{#key allMembers}
		<div class="members">
			{#each allMembers as member}
				<div class="member">
					<p>{member.memberName}</p>
					<div class="roles">
						<button
							class="btn btn-secondary dropdown-toggle"
							type="button"
							id="roleDropdown"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							value={member.memberId}
							on:click={(e) => HandleUserName(e)}
						>
							Roller
						</button>
						<ul class="dropdown-menu" aria-labelledby="roleDropdown">
							{#if RoleName}
								{#each RoleName as role, i}
									<li style="display: flex;">
										<button class="dropdown-item">{role}</button>
										{#if member.memberRole.split(',').includes(role.trim())}
											<button
												value={role}
												on:click={(e) => HandleRoleRemove(e)}
												style="font-size:medium; margin-top:5px;">X</button
											>
										{:else}
											<button
												value={role}
												on:click={(e) => HandleRoleRemove(e)}
												style="font-size:medium; margin-top:5px;">+</button
											>
										{/if}
									</li>
								{/each}
							{/if}
						</ul>
					</div>
				</div>
			{/each}
			<button on:click={() => (isModalVisible = !isModalVisible)}>Yeni Üye Oluştur</button>
		</div>
	{/key}
{/if}

<style>
	.members {
		display: grid;
		align-content: center;
		flex-direction: row;
		padding: 2em;
		margin: auto;
	}
	.member {
		display: flex;
		align-items: center;
	}
	.roles {
		display: flex;
		padding: 0.7em;
		align-items: center;
	}
</style>
