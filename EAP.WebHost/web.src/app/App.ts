import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {Component} from 'angular2/core';
@Component({
    selector: 'app',
    template: require('./App.html'),
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/**', redirectTo: ['Home'] },
    { path: '/', name: 'Home', loader: () => require('./Index')('HomeComponent'), useAsDefault: true },
    { path: '/about', name: 'About', loader: () => require('./About')('AboutComponent') },
    { path: '/contact', name: 'Contact', loader: () => require('./Contact')('ContactComponent') },
])
export class AppComponent {
    constructor() { }
}