/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
import {Injectable, Type} from 'angular2/core';
import {RouteDefinition, RouteRegistry, RouteConfig} from 'angular2/router';

@Injectable()
export class DynamicRouteConfigurator {
    constructor(private registry: RouteRegistry) { }
    addRoute(component: Type, ...route: RouteDefinition[]) {
        let routeConfig = this.getRoutes(component);
        for (var r of route)
            routeConfig.configs.push(r);
        this.updateRouteConfig(component, routeConfig);
        for (var r of route)
            this.registry.config(component, r);
    }
    removeRoute() {
        // need to touch private APIs - bad
    }
    getRoutes(component: Type) {
        return Reflect.getMetadata('annotations', component)
            .filter(a => {
                return a.constructor.name === 'RouteConfig';
            }).pop();
    }
    updateRouteConfig(component: Type, routeConfig) {
        let annotations = Reflect.getMetadata('annotations', component);
        let routeConfigIndex = -1;
        for (let i = 0; i < annotations.length; i += 1) {
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
    }
}
