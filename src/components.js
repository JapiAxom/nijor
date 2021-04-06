export default class{
    constructor(template) {
        this.template = template;
    }
    init(name){
        this.name = name;
    }
    run(){
        let to_be_replaced = new RegExp(`(<${this.name}[^>]+>|<${this.name}>)`);
        let element = document.getElementsByTagName(this.name)[0];
        if(document.getElementsByTagName(this.name).length===0) return;
        let allSpecs = element.getAttributes();
        try {
            element.innerHTML="";
            this.template(allSpecs).then(result=>{

                element.parentElement.innerHTML = element.parentElement.innerHTML.replace(to_be_replaced,result);
                this.run();

            }).catch(e=>{

                this.template(allSpecs).then(result=>{
                    document.body.innerHTML = document.body.innerHTML.replace(to_be_replaced,result);
                    this.run();
                });
               
            });
        } catch (error) {}
    }
}