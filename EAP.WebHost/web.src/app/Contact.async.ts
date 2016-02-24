import {Component} from 'angular2/core';
import {Title} from 'angular2/platform/browser';
@Component({
    selector: 'contact',
    template: require('./Contact.html'),
    viewProviders: [Title]
})
export class ContactComponent {
    constructor(title: Title) {
        title.setTitle('Contact');
    }
}
