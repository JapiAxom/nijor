import "./common-runtime-nijor";

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

history.pushState(null,null,'/');
history.pushState(null,null,'/');
history.back();