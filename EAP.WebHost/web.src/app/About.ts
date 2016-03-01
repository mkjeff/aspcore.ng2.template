import {Component} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

@Component({
    selector: 'about',
    template: require('./About.html'),
    viewProviders: [Title],
})
export class AboutComponent {
    constructor(title: Title) {
        title.setTitle('About');
    }
}
