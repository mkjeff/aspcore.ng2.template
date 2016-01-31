import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction, RouteDefinition, AsyncRoute} from 'angular2/router';
import {componentProxyFactory} from './VirtualComponent';

//import {Login} from '../login/login';

@Directive({
    selector: 'router-outlet'
})
export class ProtectedInRouterOutlet extends RouterOutlet {
    publicRoutes: any;
    private parentRouter: Router;

    constructor(
        _elementRef: ElementRef,
        _loader: DynamicComponentLoader,
        _parentRouter: Router,
        @Attribute('name') nameAttr: string)
    {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        localStorage.setItem('jwt', 'fake');// todo: authentication from server

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true
        };
    }

    activate(instruction: ComponentInstruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
            // todo: redirect to Login, may be there a better way?
            this.parentRouter.navigateByUrl('/login');
        }
        return super.activate(instruction);
    }

    getRouteDefinitions(): Promise<RouteDefinition[]> {
        return new Promise<RouteDefinition[]>(resolve =>
            setTimeout(() => resolve([
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
                })]), 5000) // 5 seconds
        );       
    }
}