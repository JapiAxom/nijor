import "./nijor.common-runtime.js";

window.addEventListener('popstate',async e =>{
    let path = e.target.location.pathname;
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
    window.nijor.emitEvent('navigate',{path,hash});
});