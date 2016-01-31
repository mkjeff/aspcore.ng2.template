var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var VirtualComponent_1 = require('./VirtualComponent');
//import {Login} from '../login/login';
var ProtectedInRouterOutlet = (function (_super) {
    __extends(ProtectedInRouterOutlet, _super);
    function ProtectedInRouterOutlet(_elementRef, _loader, _parentRouter, nameAttr) {
        _super.call(this, _elementRef, _loader, _parentRouter, nameAttr);
        localStorage.setItem('jwt', 'fake'); // todo: authentication from server
        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true
        };
    }
    ProtectedInRouterOutlet.prototype.activate = function (instruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
            // todo: redirect to Login, may be there a better way?
            this.parentRouter.navigateByUrl('/login');
        }
        return _super.prototype.activate.call(this, instruction);
    };
    ProtectedInRouterOutlet.prototype.getRouteDefinitions = function () {
        return new Promise(function (resolve) {
            return setTimeout(function () { return resolve([
                {
                    name: 'Contact',
                    path: '/contact',
                    component: VirtualComponent_1.componentProxyFactory({
                        path: 'app/home/Contact',
                        provide: function (m) { return m.ContactComponent; }
                    }),
                },
                new router_1.AsyncRoute({
                    name: 'About',
                    path: '/about',
                    loader: function () { return System.import('app/home/About').then(function (m) { return m.AboutComponent; }); },
                })]); }, 5000);
        } // 5 seconds
         // 5 seconds
        );
    };
    ProtectedInRouterOutlet = __decorate([
        core_1.Directive({
            selector: 'router-outlet'
        }),
        __param(3, core_1.Attribute('name')), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, router_1.Router, String])
    ], ProtectedInRouterOutlet);
    return ProtectedInRouterOutlet;
})(router_1.RouterOutlet);
exports.ProtectedInRouterOutlet = ProtectedInRouterOutlet;
//# sourceMappingURL=ProtectedRouterOutlet.js.map