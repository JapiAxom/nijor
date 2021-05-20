export default class{

    constructor(path,routesDiv){
        window.nijor.hashroutes[path]={};
        this.pathName=path;
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
        if (url === "#" || url === "/") {
            url = "#";
        }
        window.nijor.hashroutes[this.pathName][url] = async()=>{
            this.preRenderfn();
            document.querySelector(this.routesDiv).innerHTML="<app></app>";
            Page.init('app');
            await Page.run();
            this.postRenderfn();
        };
    }

    redirect(url,newUrl){
        if (url === "#" || url === "/") {
            url = "#";
        }
        window.nijor.hashroutes[this.pathName][url] = ()=>{
            window.location.hash = newUrl;
        };
    }

    render=async App =>{
        try {
            App.init('app');
            await App.run(); 
        } catch (error) {}
        let hash = window.location.hash;

        if (hash === "" || hash === "#") {
            hash = "#";
        }

        let url = hash;
        let path = window.location.pathname;
        window.nijor.renderHashRoute(path,url);
        
    }

}