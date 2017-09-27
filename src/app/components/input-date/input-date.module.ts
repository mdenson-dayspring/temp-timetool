import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DatepickerComponent } from './datepicker.component';
import { InputDateComponent, DateStampPipe } from './input-date.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    DatepickerComponent,
    DateStampPipe,
    InputDateComponent
  ],
  exports: [
    DatepickerComponent,
    DateStampPipe,
    InputDateComponent
  ]
})
export class InputDateModule { }
