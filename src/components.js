export default class{
    constructor(template) {
        this.template = template;
    }
    init(name){
        this.name = name;
    }
    run = async function(){
        let to_be_replaced = new RegExp(`(<${this.name}[^>]+>|<${this.name}>)`);
        let element = document.getElementsByTagName(this.name)[0];
        if(document.getElementsByTagName(this.name).length===0) return;
        let allSpecs = element.getAttributes();
        try {
            element.innerHTML="";
            try {
                let result = await this.template(allSpecs);
                element.parentElement.innerHTML = element.parentElement.innerHTML.replace(to_be_replaced,result);
                this.run();
            } catch (error) {
                let result = await this.template(allSpecs);
                document.body.innerHTML = document.body.innerHTML.replace(to_be_replaced,result);
                this.run();
            }
        } catch (error) {}
    }
}