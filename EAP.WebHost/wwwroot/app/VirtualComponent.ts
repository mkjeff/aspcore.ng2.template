/// <reference path="../../typings/tsd.d.ts" />
import {
Type,
Component,
View,
ElementRef,
DynamicComponentLoader,
Injector,
bind
}from 'angular2/core';

export class ComponentProvider {
    path: string;
    provide: { (module: any): any };
}

//const PROXY_CLASSNAME = 'component-wrapper';
//const PROXY_SELECTOR = `.${PROXY_CLASSNAME}`;

export function componentProxyFactory(provider: ComponentProvider): Type {
    @Component({
        selector: 'component-proxy',
        bindings: [bind(ComponentProvider).toValue(provider)]
    })
    @View({
        //template: `<span #content></span>` // for loadIntoLocation, via template local variable
        //template: `<span id='content'></span>`, // for loadAsRoot, via DOM id selector 
            template: '', // for loadNextToLocation 
    })
    class VirtualComponent {
        constructor(
            el: ElementRef,
            loader: DynamicComponentLoader,
            injector: Injector,
            provider: ComponentProvider
        ) {
            System.import(provider.path)
                .then(m => {
                    //loader.loadIntoLocation(provider.provide(m), el, 'content');
                    //loader.loadAsRoot(provider.provide(m), '#content', injector);
                    loader.loadNextToLocation(provider.provide(m), el);
                });
        }
    }
    return VirtualComponent;
}