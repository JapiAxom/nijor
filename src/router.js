let allRoutes = {
    "/": () => { },
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
        allRoutes[url] = ()=>{
            setTimeout(()=>{
                this.preRenderfn();
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                Page.run();
                this.postRenderfn();
        },3);
        }
        allRoutes[url+'/'] = ()=>{
            setTimeout(()=>{
                this.preRenderfn();
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                Page.run();
                this.postRenderfn();
        },3);
        }
    }
    render(App) {
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