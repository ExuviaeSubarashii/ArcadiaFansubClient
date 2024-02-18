<script lang="ts">
	import { pageCount } from "../datas/stores";

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let numbers=29;

let letter:any;
let pageNumber:any;
function handleAlphabet(letter:any){
    window.location.href=`/anime/${letter}`
}
function handlePage(num:any){
    window.location.href=`/sort/${num}`;
}
</script>

<div class="fullbody mt-3">
    <div class="mt-3 ms-5 row d-flex g-0">
        <select class="form-select mb-3" style="width: 5%;" bind:value={letter} on:change={()=>handleAlphabet(letter)}>
            {#each alphabet as letter}
            <option value="{letter}">{letter}</option>
            {/each}
        </select>
        <select class="form-select mb-3" style="width: 5%;" bind:value={pageNumber} on:change={()=>handlePage(pageNumber)}>
            {#each Array(numbers) as num,i}
            <option value="{i}">{i}</option>
            {/each}
        </select>
        
        
    </div>
</div>

