var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts" />
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var DynamicRouteConfigurator = (function () {
    function DynamicRouteConfigurator(registry) {
        this.registry = registry;
    }
    DynamicRouteConfigurator.prototype.addRoute = function (component) {
        var route = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            route[_i - 1] = arguments[_i];
        }
        var routeConfig = this.getRoutes(component);
        for (var _a = 0; _a < route.length; _a++) {
            var r = route[_a];
            routeConfig.configs.push(r);
        }
        this.updateRouteConfig(component, routeConfig);
        for (var _b = 0; _b < route.length; _b++) {
            var r = route[_b];
            this.registry.config(component, r);
        }
    };
    DynamicRouteConfigurator.prototype.removeRoute = function () {
        // need to touch private APIs - bad
    };
    DynamicRouteConfigurator.prototype.getRoutes = function (component) {
        return Reflect.getMetadata('annotations', component)
            .filter(function (a) {
            return a.constructor.name === 'RouteConfig';
        }).pop();
    };
    DynamicRouteConfigurator.prototype.updateRouteConfig = function (component, routeConfig) {
        var annotations = Reflect.getMetadata('annotations', component);
        var routeConfigIndex = -1;
        for (var i = 0; i < annotations.length; i += 1) {
            if (annotations[i].constructor.name === 'RouteConfig') {
                routeConfigIndex = i;
                break;
            }
        }
        if (routeConfigIndex < 0) {
            throw new Error('No route metadata attached to the component');
        }
        annotations[routeConfigIndex] = routeConfig;
        Reflect.defineMetadata('annotations', annotations, component);
    };
    DynamicRouteConfigurator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.RouteRegistry])
    ], DynamicRouteConfigurator);
    return DynamicRouteConfigurator;
})();
exports.DynamicRouteConfigurator = DynamicRouteConfigurator;
//# sourceMappingURL=ngExt.js.map