import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store';
import * as contextActions from '../store/context/context.actions';
import * as timesheetActions from '../store/timesheet/timesheet.actions';

import { DayOfWeek, Context, HM } from '../models';

const PATH_TO_IMGS = require.context('../../../public/images');
import '../../sass/styles.scss';

@Component({
  selector: 'timetool',
  template: require('./app.component.html')
})
export class AppComponent {
  now: HM;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private store: Store<fromRoot.State>,
    private $log: Logger) {

    this.document
      .getElementById('appFavicon')
      .setAttribute('href', `${PATH_TO_IMGS('./icon.png')}`);
    this.now = HM.Now();
    store.dispatch(new contextActions.LoadPageAction(this.now));

    store.dispatch(new timesheetActions.ResetWeekAction());
    store.dispatch(new timesheetActions.FetchWeekAction());

    Observable
      .interval(1000)
      .map(() => {
        return HM.Now();
      })
      .filter((value) => {
        return (!this.now || !this.now.equals(value));
      })
      .subscribe((newTime) => {
        this.now = newTime;
        store.dispatch(new contextActions.TickAction(this.now));
      });

  }

}
