import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {Component} from 'angular2/core';
import {HomeComponent} from './Index';
@Component({
  selector: 'app',
  template: require('./App.html'),
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/**', redirectTo: ['Home'] },
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
    useAsDefault: true
  },
  {
    path: '/about',
    name: 'About',
    loader: () => require('es6-promise!./About')('AboutComponent')
  },
  {
    path: '/contact',
    name: 'Contact',
    loader: () => require('es6-promise!./Contact')('ContactComponent')
  },
])
export class AppComponent {
  constructor() { }
}
