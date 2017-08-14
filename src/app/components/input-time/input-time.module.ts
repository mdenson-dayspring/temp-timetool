import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { InputTimeComponent, TimePipe } from './input-time.component';
import { InputFocusDirective } from './input-focus.directive';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    InputFocusDirective,
    TimePipe,
    InputTimeComponent
  ],
  exports: [
    TimePipe,
    InputTimeComponent
  ]
})
export class InputTimeModule { }
