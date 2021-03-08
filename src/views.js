export default function(newVal,view){
    document.querySelectorAll('nijorview[view="'+view+'"]').forEach(function(child){
        child.innerHTML=newVal;
    });
}