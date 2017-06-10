import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

export interface Customer {
    name: string;
    addresses: Address[];
}

export interface Address {
    street: string;
    postcode: string;
}

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent implements OnInit {
    public myForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            counter: 2,
            addresses: this._fb.array([
                this.initAddress()
            ])
        });
        console.log(this.myForm);
    }

    initAddress() {
        return this._fb.group({
            street: ['', Validators.required],
            postcode: ['']
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls.addresses;
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls.addresses;
        control.removeAt(i);
    }

    save(model: Customer) {
        // call API to save
        // ...
        console.log(model);
    }
}
