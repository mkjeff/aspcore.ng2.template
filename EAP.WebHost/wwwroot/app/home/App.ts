import {ROUTER_DIRECTIVES, RouteConfig, AsyncRoute, RouteDefinition, Redirect, CanDeactivate, ComponentInstruction} from 'angular2/router';
import {Component, View, ViewChild, ContentChild, AfterViewInit} from 'angular2/core';
import {HomeComponent} from './Index';
import {componentProxyFactory} from '../VirtualComponent';
import {DynamicRouteConfigurator} from '../ngExt';
import {ProtectedInRouterOutlet}from '../ProtectedRouterOutlet';
@Component({
    selector: 'app',
    moduleId: module.id,
    viewProviders: [DynamicRouteConfigurator],
})
@View({
    templateUrl: 'App.html',
    directives: [ROUTER_DIRECTIVES, ProtectedInRouterOutlet]
})
@RouteConfig([
    { path: '/**', redirectTo: ['Home'] },
    {
        name: 'Home',
        path: '/',
        component: componentProxyFactory({
            path: 'app/home/Index',
            provide: m => m.HomeComponent
        }),
        useAsDefault: true
    }
])
export class AppComponent implements AfterViewInit{
    @ViewChild(ProtectedInRouterOutlet)
    routeOutlet: ProtectedInRouterOutlet;

    appRoutes: RouteDefinition[];

    constructor(private dynamicRouteConfigurator: DynamicRouteConfigurator) {
        this.appRoutes = this.getAppRoutes();
        // simulate server API invocation
        setTimeout(_ => {
            this.dynamicRouteConfigurator.addRoute(this.constructor,
                {
                    name: 'Contact',
                    path: '/contact',
                    component: componentProxyFactory({
                        path: 'app/home/Contact',
                        provide: m => m.ContactComponent
                    }),
                },
                new AsyncRoute({
                    name: 'About',
                    path: '/about',
                    loader: () => System.import('app/home/About').then(m => m.AboutComponent),
                })
            );
            this.appRoutes = this.getAppRoutes();
        }, 5000);
    }

    ngAfterViewInit() {
        //this.routeOutlet.getRouteDefinitions().then(r=> {
        //    this.dynamicRouteConfigurator.addRoute(this.constructor, r);
        //    this.appRoutes = r;
        //});
        //routeOutlet.getRoutes();
        console.log(this.routeOutlet);
    }

    ngAfterContentInit() {
        // this.footer is now with value set
        //this.routeOutlet.name;
    }

    private getAppRoutes(): string[][] {
        return this.dynamicRouteConfigurator
            .getRoutes(this.constructor).configs
            .filter(r=> r.redirectTo == null)
            .map(route => {
                return { path: [`/${route.name}`], name: route.name };
            });
    }
}