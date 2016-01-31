import {Component,View,OnInit} from 'angular2/core';
import {Title} from 'angular2/platform/browser';
@Component({
    selector: 'index',
    moduleId: module.id,
    viewProviders: [Title],
})
@View({
        templateUrl: 'Index.html',
})
export class HomeComponent {
    constructor(title: Title) {
        title.setTitle('Home');
    }
}