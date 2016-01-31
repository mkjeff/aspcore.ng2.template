import {Component,View} from 'angular2/core';
import {Title} from 'angular2/platform/browser';
@Component({
    selector: 'contact',
    moduleId: module.id,
    viewProviders: [Title]
})
@View({
    templateUrl: 'Contact.html',
})
export class ContactComponent {
    constructor(title: Title) {
        title.setTitle('Contact');
    }
}