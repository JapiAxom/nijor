Object.prototype.getAttributes = function () {
    let el = this;
    var nodes = [], values = [];
    for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
        att = atts[i];
        nodes.push(att.nodeName);
        values.push(att.nodeValue);
    }
    nodes.push('innerContent');
    values.push(this.innerHTML);
    var keys = nodes;
    var Values = values;
    var allAttributes = {};
    keys.forEach((key, i) => allAttributes[key] = Values[i]);
    return (allAttributes);
};
export default class{
    constructor(template) {
        this.template = template;
    }
    init(name){
        this.name = name;
    }
    run(){
        let to_be_replaced = new RegExp(`(<${this.name}[^>]+>|<${this.name}>)`);
        document.querySelectorAll(this.name).forEach((child) => {
                let allSpecs = child.getAttributes();
                this.template(allSpecs).then((result)=>{
                    try {
                        child.parentElement.innerHTML = child.parentElement.innerHTML.replace(to_be_replaced,result);
                    } catch (error) {
                        document.body.innerHTML = document.body.innerHTML.replace(to_be_replaced,result);
                    }
                    child.innerHTML='';
            });
        });
    }
}