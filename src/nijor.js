/*
    Object.prototype.getAttributes:
                This function returns the key-value-pair of an HTML element.
                Example: 
                    HTML: <card name="Test" price="Test"></card>
                    JS: document.getElementsByName('card')[0].getAttributes; will return {name:'Test',price:'Test'}
*/
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
window.location.query = function(){
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
};

window.nijor.hashredirect = function(path,hash){
    try {
        history.pushState(null,null,path+hash);
        window.nijor.renderHashRoute(path,hash);
    } catch (error) {
        window.location.href=route;
    }
};

window.nijor.renderRoute = function(url){
    try{
        window.nijor.routes[url]();
    }
    catch(e){
        window.nijor.routes["*"]();
    }
    window.nijor.previousRoute = window.location.pathname;
}

window.nijor.renderHashRoute = function(path,hash){
    try {
        window.nijor.hashroutes[path][hash]();
    } catch (e) {
        try {
            window.nijor.hashroutes[path]['*']();
        } catch (error) {}
    }
}

window.onhashchange = () => {
    let hash = window.location.hash;
    let path = window.location.pathname;
    window.nijor.previousRoute = window.location.pathname;
    if (hash === "" || hash === "#") {
        hash = "#";
    }
    window.nijor.renderHashRoute(path,hash);
}