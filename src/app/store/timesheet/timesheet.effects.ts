import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TimesheetService } from '../../services/timesheet.service';
import * as timesheetActions from './timesheet.actions';

import { DayInfo } from '../../models';

@Injectable()
export class TimesheetEffects {

  @Effect()
  fetchWeek$: Observable<Action> = this.actions$
    .ofType(timesheetActions.ACTION.FETCH_WEEK)
    .switchMap((action: timesheetActions.FetchWeekAction) => {
      return this.$svc.fetchTimeData()
        .map(week => {
          return new timesheetActions.SetWeekAction(week);
        })
        .catch(err => {
          this.$log.error('[fetchWeek.effect] catch', err);
          return of(<Action>{ type: 'noop' });
        });
    });

  constructor(private actions$: Actions,
              private $svc: TimesheetService,
              private $log: Logger) {

  }

}
