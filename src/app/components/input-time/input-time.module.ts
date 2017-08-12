import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { InputTimeComponent, TimePipe } from './input-time.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    TimePipe,
    InputTimeComponent
  ],
  exports: [
    TimePipe,
    InputTimeComponent
  ]
})
export class InputTimeModule { }
