import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { AddressComponent } from './address.component';

import { CounterInputComponent } from './counter-input.component';

import { MainPagesRoutingModule } from './main-pages-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MainPagesRoutingModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    AddressComponent,
    CounterInputComponent
  ],
  bootstrap: [HomeComponent],
  providers: [LOG_LOGGER_PROVIDERS]
})
export class MainPagesModule { }
