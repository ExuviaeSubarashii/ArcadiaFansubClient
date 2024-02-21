export function IsNullOrEmpty(value:any){
if(value === null || value === undefined || value === ""||value===''){
    return true;
}
else{
    return false;
}
}