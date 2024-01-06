<script lang="ts">
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

<!-- <div class="column border border-1 ms-5 sticky-bottom mt-5" style="width: 39%;">
    {#each alphabet as letter}
    <button type="button" on:click={()=>{
        window.location.href=`anime/${letter}`
    }} class="btn btn-primary btn-sm">{letter}</button>
    {/each}
</div> -->
<!-- <div class="column border border-1 ms-5 sticky-bottom mt-4" style="width:10%;">

    {#each Array(numbers) as num,i}
    <button on:click={()=>{
        window.location.href=`/sort/${i}`;
    }}>{i}</button>
    {/each}
</div> -->

<div class="fullbody mt-3">
    <div class="mt-3">
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

