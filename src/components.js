export default class{
    constructor(template) {
        this.template = template;
    }
    init(name){
        this.name = name;
    }
    run(){
        setTimeout(()=>{
            let to_be_replaced = new RegExp(`(<${this.name}[^>]+>|<${this.name}>)`);
            document.querySelectorAll(this.name).forEach((child) => {
                    let allSpecs = child.getAttributes();
                    child.innerHTML='';
                    this.template(allSpecs).then((result)=>{
                        try {
                            child.parentElement.innerHTML = child.parentElement.innerHTML.replace(to_be_replaced,result);
                        } catch (error) {
                            document.body.innerHTML = document.body.innerHTML.replace(to_be_replaced,result);
                        }
                });
            });
        },3);
    }
}