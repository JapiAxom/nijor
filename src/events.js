export function emit(eventName,data){
    document.querySelectorAll('[on'+eventName+']').forEach(element=>{
        let cevent = element.getAttribute('on'+eventName);
        var ceventArr = cevent.split(')');
        if(ceventArr[0].endsWith('(')){
            ceventArr[1]=JSON.stringify(data)+')';
        }else{
            ceventArr[1]=','+JSON.stringify(data)+')';
        }
        cevent = ceventArr.join('');
        eval(cevent);
    });
}