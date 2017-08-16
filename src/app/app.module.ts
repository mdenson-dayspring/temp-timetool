import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { Store, StoreModule } from '@ngrx/store';

import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { InputTimeModule } from './components/input-time/input-time.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { WeekComponent, WeekTableComponent, WeekTableRowComponent } from './components/week';

import { NowPage } from './pages/now/now.page';
import { SettingsPage } from './pages/settings/settings.page';

import { TimesheetService } from './services';
import { reducer } from './store';
import { TimesheetEffects } from './store/timesheet/timesheet.effects';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    InputTimeModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(TimesheetEffects)
  ],
  declarations: [
    AppComponent,
    NavBarComponent,

    TimelineComponent,
    WeekComponent,
    WeekTableComponent,
    WeekTableRowComponent,

    NowPage,
    SettingsPage
  ],
  bootstrap: [AppComponent],
  providers: [
    LOG_LOGGER_PROVIDERS,
    TimesheetService
  ]
})
export class AppModule { }
