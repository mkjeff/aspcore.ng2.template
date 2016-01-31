var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var ContactComponent = (function () {
    function ContactComponent(title) {
        title.setTitle('Contact');
    }
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'contact',
            moduleId: module.id,
            viewProviders: [browser_1.Title]
        }),
        core_1.View({
            templateUrl: 'Contact.html',
        }), 
        __metadata('design:paramtypes', [browser_1.Title])
    ], ContactComponent);
    return ContactComponent;
})();
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=Contact.js.map