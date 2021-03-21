export const setView = (newVal,view)=>{
    document.querySelectorAll('nijorview[view="'+view+'"]').forEach(function(child){
        child.innerHTML=newVal;
    });
}
export const getView = view => document.querySelector('nijorview[view="'+view+'"]').innerHTML;