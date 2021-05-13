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
        window.nijor.routes[url] = async()=>{
                this.preRenderfn();
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                await Page.run();
                this.postRenderfn();
        }
        window.nijor.routes[url+'/'] = async()=>{
                this.preRenderfn();
                document.querySelector(this.routesDiv).innerHTML="<app></app>";
                Page.init('app');
                await Page.run();
                this.postRenderfn();
        }
    }

    redirect(url,newUrl){
        window.nijor.routes[url] = ()=>{
            window.nijor.redirect(newUrl);
        }
        window.nijor.routes[url+'/'] = ()=>{
            window.nijor.redirect(newUrl);
        }
    }

    render = async App =>{
        try {
            App.init('app');
            await App.run(); 
        } catch (error) {}
        let url = window.location.pathname;
        window.nijor.renderRoute(url);

        window.onpopstate = function() {
            let url = window.location.pathname;
            if(url===window.nijor.previousRoute) {return;};
            window.nijor.renderRoute(url);
        };

    }

}