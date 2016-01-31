var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../typings/tsd.d.ts" />
var core_1 = require('angular2/core');
var ComponentProvider = (function () {
    function ComponentProvider() {
    }
    return ComponentProvider;
})();
exports.ComponentProvider = ComponentProvider;
//const PROXY_CLASSNAME = 'component-wrapper';
//const PROXY_SELECTOR = `.${PROXY_CLASSNAME}`;
function componentProxyFactory(provider) {
    var VirtualComponent = (function () {
        function VirtualComponent(el, loader, injector, provider) {
            System.import(provider.path)
                .then(function (m) {
                //loader.loadIntoLocation(provider.provide(m), el, 'content');
                //loader.loadAsRoot(provider.provide(m), '#content', injector);
                loader.loadNextToLocation(provider.provide(m), el);
            });
        }
        VirtualComponent = __decorate([
            core_1.Component({
                selector: 'component-proxy',
                bindings: [core_1.bind(ComponentProvider).toValue(provider)]
            }),
            core_1.View({
                //template: `<span #content></span>` // for loadIntoLocation, via template local variable
                //template: `<span id='content'></span>`, // for loadAsRoot, via DOM id selector 
                template: '',
            }), 
            __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, core_1.Injector, ComponentProvider])
        ], VirtualComponent);
        return VirtualComponent;
    })();
    return VirtualComponent;
}
exports.componentProxyFactory = componentProxyFactory;
//# sourceMappingURL=VirtualComponent.js.map