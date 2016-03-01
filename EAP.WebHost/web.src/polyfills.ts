﻿// Polyfills
// import 'ie-shim';
import 'es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es6-promise';
import 'es7-reflect-metadata';
import 'zone.js/dist/zone-microtask';

if ('production' === process.env.ENV) {
    // Production

    // RxJS
    // In production manually include the operators you use
    require('rxjs');

} else {
    // Development

    Error['stackTraceLimit'] = Infinity;

    require('zone.js/dist/long-stack-trace-zone');

    // RxJS
    // In development we are including every operator
    //require('rxjs/add/operator/map');
    //require('rxjs/add/operator/mergeMap');

    require('rxjs');

}
// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
require('jquery');
require('bootstrap-loader');
