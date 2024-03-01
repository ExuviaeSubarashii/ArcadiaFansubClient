export function IsNullOrEmpty(value:any){
if(value === null || value === undefined || value === ""||value===''||value==='undefined'){
    return true;
}
else{
    return false;
}
}