let allRoutes = {
    "#": () => { },
    "*": () => { }
};
export default class{
    constructor(routesDiv){
        this.routesDiv = routesDiv;
        this.preRenderfn = function(){};
        this.postRenderfn = function(){};
    }
    preRender(fn){
        this.preRenderfn = function () {
            try { fn() } catch (error) {}
        }
    }
    postRender(fn){
        this.postRenderfn = function () {
            try { fn() } catch (error) {}
        }
    }
    route(url,Page){
        this.url = url;
        if (url === "#" || url === "/") {
            url = "#";
        }
        allRoutes[url] = ()=>{
            setTimeout(()=>{
                this.preRenderfn();
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                Page.run();
                this.postRenderfn();
            },3);
        };
    }
    render(App) {
        try {
            document.nijor.rootComponent = App;
            App.init('app');
            App.run(); 
        } catch (error) {}
        let hash = window.location.hash;
        if (hash === "" || hash === "#") {
            hash = "#";
        }
        let url = hash;
        try {
            allRoutes[url]();
        } catch (e) {
            allRoutes['*']();
        }
        window.onhashchange = () => {
            let hash = window.location.hash;
            if (hash === "" || hash === "#") {
                hash = "#";
            }
            try {
                allRoutes[hash]();
            } catch (e) {
                allRoutes['*']();
            }
        }
    }
}