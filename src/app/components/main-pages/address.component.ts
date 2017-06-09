import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'address',
    templateUrl: 'address.component.html'
})
export class AddressComponent {
    @Input('group')
    public addressForm: FormGroup;

    constructor() { }

    ngOnChange() {
      console.log(this.addressForm);
    }
}
