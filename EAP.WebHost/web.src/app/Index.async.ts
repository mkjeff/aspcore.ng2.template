import {Component} from 'angular2/core';
import {Title} from 'angular2/platform/browser';
@Component({
    selector: 'index',
    template: require('./Index.html'),
    viewProviders: [Title],
})
export class HomeComponent {
    constructor(title: Title) {
        title.setTitle('Home');
    }
}