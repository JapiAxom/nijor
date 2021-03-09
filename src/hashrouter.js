let allRoutes = {
    "#": () => { },
    "*": () => { }
};
export default class{
    constructor(routesDiv){
        this.routesDiv = routesDiv;
    }
    add(url, callback) {
        this.url = url;
        this.action = callback;
        if (url === "#" || url === "/") {
            url = "#";
        }
        allRoutes[url] = callback;
    }
    render(url,Page){
        this.url = url;
        if (url === "#" || url === "/") {
            url = "#";
        }
        allRoutes[url] = ()=>{
            setTimeout(()=>{
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                Page.run();
            },3);
        };
    }
    extend(url,anotherRouter){
    }
    route(App) {
        try {
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