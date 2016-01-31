import {Component,View} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

@Component({
    selector: 'about',
    moduleId: module.id,
    viewProviders: [Title],
})
    @View({
        templateUrl: 'About.html',
})
export class AboutComponent {
    constructor(title: Title) {
        title.setTitle('About');
    }
}