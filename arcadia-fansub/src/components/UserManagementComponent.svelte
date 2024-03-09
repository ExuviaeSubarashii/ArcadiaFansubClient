<script lang="ts">
	import { onMount } from 'svelte';
	import type { Member, Roles } from '../types/types';
	import { GetAllMembers, AddOrRemoveMemberRole } from '../datas/members/members';

	let allMembers: Member[] = [];
	onMount(async () => {
		allMembers = await GetAllMembers();
		console.log(allMembers);
	});
	let RoleName = ['Kodlama', 'Kodlama', 'Çevirmen', 'Admin', 'Editör', 'Redaktör'];
    let userId:number;
    let roleName:string;
    
    async function HandleRoleRemove(e:any){
        roleName=e.target.value;
        await AddOrRemoveMemberRole(roleName,userId);
    }
    function HandleUserName(e:any){
        userId=e.target.value;
    }
</script>

{#if allMembers}
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
                        value="{member.memberId}"
                        on:click={(e)=>HandleUserName(e)}
					>
						Roller
					</button>
					<ul class="dropdown-menu" aria-labelledby="roleDropdown">
						{#if RoleName}
							{#each RoleName as role, i}
								<li style="display: flex;">
									<button class="dropdown-item">{role}</button>
									{#if member.memberRole.split(',').includes(role.trim())}
										<button value="{role}" on:click={(e)=>HandleRoleRemove(e)}>X</button>
                                        {:else}
										<button value="{role}" on:click={(e)=>HandleRoleRemove(e)}>+</button>
									{/if}
								</li>
							{/each}
						{/if}
					</ul>
				</div>
			</div>
		{/each}
	</div>
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
    .roles{
        display: flex;
        padding: 0.7em;
        align-items: center;
    }
</style>
