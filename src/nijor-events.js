export default class {
    constructor(eventName){
        this.eventName = eventName;
    }
    emit(data){
        document.querySelectorAll('[on'+this.eventName+']').forEach(element=>{
            let cevent = element.getAttribute('on'+this.eventName);
            var ceventArr = cevent.split(')');
            ceventArr[1]=','+JSON.stringify(data)+')';
            cevent = ceventArr.join('');
            eval(cevent);
        });
    }
}