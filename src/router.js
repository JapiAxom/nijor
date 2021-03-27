let allRoutes = {
    "/": () => { },
    "*": () => { }
};
export default class{
    constructor(routesDiv){
        this.routesDiv = routesDiv;
    }
    add(url, callback) {
        allRoutes[url] = ()=>{
            callback();
        }
    }
    render(url,Page){
        let url_with_shlash,url_without_shlash;
        if(url.endsWith('/')){
            url_with_shlash = url;
            let url_chars_array = url.split('').reverse();
            url_chars_array = url_chars_array.pop();
            url_without_shlash =url_chars_array.join('');
        }else{
            url_with_shlash = url + '/';
            url_without_shlash = url;
        }
        allRoutes[url_with_shlash] = ()=>{
            setTimeout(()=>{
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                Page.run();
        },3);
        };
        allRoutes[url_without_shlash] = ()=>{
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