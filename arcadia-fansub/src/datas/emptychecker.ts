export function IsNullOrEmpty(value:any){
if(value.trim() === null || value.trim() === undefined || value.trim() === ""||value.trim()===''||value.trim()==='undefined'){
    return true;
}
else{
    return false;
}
}