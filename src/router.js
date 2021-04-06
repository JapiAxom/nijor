let allRoutes = {
    "/": () => { },
    "*": () => { }
};
export default class{
    constructor(routesDiv){
        this.routesDiv = routesDiv;
    }
    route(url,Page){
        allRoutes[url] = ()=>{
            setTimeout(()=>{
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                Page.run();
        },3);
        }
        allRoutes[url+'/'] = ()=>{
            setTimeout(()=>{
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                Page.run();
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