async function get(url){
let response = await fetch(url);
return(response.json());
}
async function post(url,data,headers={"Content-type": "application/json"}){
let response = await fetch(url,{
    method:"POST",
    body:JSON.stringify(data),
    headers:headers
});
return(response.json());
}
async function put(url,data,headers={"Content-type": "application/json"}){
let response = await fetch(url,{
    method:"PUT",
    body:JSON.stringify(data),
    headers:headers
});
return(response.json());
}
async function del(url,headers={"Content-type": "application/json"}){
let response = await fetch(url,{
    method:"DELETE",
    headers:headers
});
return(response.json());
}
export {get,post,put,del};