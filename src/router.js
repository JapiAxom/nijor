let allRoutes = {
    "/": () => { },
    "*": () => { }
};
export default class{
    constructor(routesDiv){
        this.routesDiv = routesDiv;
    }
    add(url, callback) {
        this.url = url;
        allRoutes[url] = ()=>{
            callback();
        }
    }
    render(url,Page){
        this.url = url;
        allRoutes[url] = ()=>{
            document.querySelector(this.routesDiv).innerHTML="<app></app>";
            Page.init('app');
            Page.run();
        };
    }
    extend(url,anotherRouter){
    }
    route(App) {
        try {
            App.init('app');
            App.run(); 
        } catch (error) {}
        let url = window.location.pathname;
        try {
            allRoutes[url]();
        } catch (e) {
            allRoutes['*']();
        }
        window.onpopstate = function() {
            let url = window.location.pathname;
            try{
                allRoutes[url]();
            }
            catch(e){
                allRoutes["*"]();
            }
        };
    }
}