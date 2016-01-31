var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require('angular2/router');
var core_1 = require('angular2/core');
var VirtualComponent_1 = require('../VirtualComponent');
var ngExt_1 = require('../ngExt');
var ProtectedRouterOutlet_1 = require('../ProtectedRouterOutlet');
var AppComponent = (function () {
    function AppComponent(dynamicRouteConfigurator) {
        var _this = this;
        this.dynamicRouteConfigurator = dynamicRouteConfigurator;
        this.appRoutes = this.getAppRoutes();
        // simulate server API invocation
        setTimeout(function (_) {
            _this.dynamicRouteConfigurator.addRoute(_this.constructor, {
                name: 'Contact',
                path: '/contact',
                component: VirtualComponent_1.componentProxyFactory({
                    path: 'app/home/Contact',
                    provide: function (m) { return m.ContactComponent; }
                }),
            }, new router_1.AsyncRoute({
                name: 'About',
                path: '/about',
                loader: function () { return System.import('app/home/About').then(function (m) { return m.AboutComponent; }); },
            }));
            _this.appRoutes = _this.getAppRoutes();
        }, 5000);
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        //this.routeOutlet.getRouteDefinitions().then(r=> {
        //    this.dynamicRouteConfigurator.addRoute(this.constructor, r);
        //    this.appRoutes = r;
        //});
        //routeOutlet.getRoutes();
        console.log(this.routeOutlet);
    };
    AppComponent.prototype.ngAfterContentInit = function () {
        // this.footer is now with value set
        //this.routeOutlet.name;
    };
    AppComponent.prototype.getAppRoutes = function () {
        return this.dynamicRouteConfigurator
            .getRoutes(this.constructor).configs
            .filter(function (r) { return r.redirectTo == null; })
            .map(function (route) {
            return { path: [("/" + route.name)], name: route.name };
        });
    };
    __decorate([
        core_1.ViewChild(ProtectedRouterOutlet_1.ProtectedInRouterOutlet), 
        __metadata('design:type', ProtectedRouterOutlet_1.ProtectedInRouterOutlet)
    ], AppComponent.prototype, "routeOutlet", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            moduleId: module.id,
            viewProviders: [ngExt_1.DynamicRouteConfigurator],
        }),
        core_1.View({
            templateUrl: 'App.html',
            directives: [router_1.ROUTER_DIRECTIVES, ProtectedRouterOutlet_1.ProtectedInRouterOutlet]
        }),
        router_1.RouteConfig([
            { path: '/**', redirectTo: ['Home'] },
            {
                name: 'Home',
                path: '/',
                component: VirtualComponent_1.componentProxyFactory({
                    path: 'app/home/Index',
                    provide: function (m) { return m.HomeComponent; }
                }),
                useAsDefault: true
            }
        ]), 
        __metadata('design:paramtypes', [ngExt_1.DynamicRouteConfigurator])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=App.js.map