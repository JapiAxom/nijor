Object.prototype.getAttributes = function () {
    /*
    This function returns the key-value-pair of an HTML element.
    Example: 
        HTML: <card name="Test" price="Test"></card>
        JS: document.getElementsByName('card')[0].getAttributes; will return {name:'Test',price:'Test'}
    */
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

window.location.query = function(){
    // this function returns the url parameters.
    var params = {};
    var parser = document.createElement('a');
    parser.href = window.location.href;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

// window.nijor is an object used by Nijor during runtime.
// window.nijorfunc is an object that stores all the events like on:click="clicked()" (on:{event}="func()") 

window.nijor={};
window.nijorfunc={};

window.nijor.routes = {
    "/": () => { },
    "*": () => { }
};

window.nijor.hashroutes = {};

window.nijor.redirect = function(route){
    window.nijor.previousRoute=window.location.pathname;
    try {
        history.pushState(null,null,route);
        history.pushState(null,null,route);
        history.back();
    } catch (error) {
        window.location.href=route;
    }
    return false;
};

window.nijor.renderRoute = async function(url){
    try{
        await window.nijor.routes[url]();
    }
    catch(e){
        await window.nijor.routes["*"]();
    }
    window.nijor.previousRoute = window.location.pathname;
}

window.nijor.renderHashRoute = async function(path,hash){
    try {
        await window.nijor.hashroutes[path][hash]();
    } catch (e) {
        try {
            await window.nijor.hashroutes[path]['*']();
        } catch (error) {}
    }
}

window.addEventListener('hashchange',async function(){
    let hash = window.location.hash;
    let path = window.location.pathname;
    window.nijor.previousRoute = window.location.pathname;
    if (hash === "" || hash === "#") {
        hash = "#";
    }
    await window.nijor.renderHashRoute(path,hash);
    window.nijor.emitEvent('navigate',{path,hash});
});

window.nijor.emitEvent = async function(eventName,data={}){
    document.querySelectorAll('[on'+eventName+']').forEach(element=>{
        if(element.getAttribute('id')===null){
            element.setAttribute('id','id_'+makeid(4,6));
        }
        var regexRoundBraces = /\((.*)\)/;
        var EventNameCalled = element.getAttribute('on'+eventName);
        var EventName = EventNameCalled.split('(')[0];
        var args = EventNameCalled.match(regexRoundBraces)[1];
        args = args.replace('$data',JSON.stringify(data));
        args = args.replace('this','_this');
        var EvaluationString= new Function(`
        var _this = document.getElementById('${element.id}');
        ${EventName}(${args});
        `);
        EvaluationString();
    });
}

window.nijor.reload = async function(eventName){
    await window.nijor.emitEvent('reload'+eventName,null);
}

function makeid(min,max){
    var length = Math.floor(Math.random() * (max - min + 1) + min);
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

window.addEventListener('popstate',async e =>{
    let path = e.target.location.pathname;

    if(path.indexOf(':')>-1){
    path = path.split(':')[1];
    }

    let hash = e.target.location.hash;
    if (hash === "" || hash === "#") {
        hash = "#";
    }
    if(path===window.nijor.previousRoute){
        await window.nijor.renderHashRoute(window.nijor.previousRoute,hash);
        return;
    }
    await window.nijor.renderRoute(path);
    await window.nijor.renderHashRoute(path,hash);
    window.nijor.previousRoute = path;
});