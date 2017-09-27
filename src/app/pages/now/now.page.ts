import { Component, OnInit } from '@angular/core';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Context, DayInfo, HM, TimesheetWeek } from '../../models';
import * as fromRoot from '../../store';
import * as contextActions from '../../store/context/context.actions';
import * as timesheetActions from '../../store/timesheet/timesheet.actions';

@Component({
  template: require('./now.page.html'),
  selector: 'now-summary'
})
export class NowPage implements OnInit {
  context$: Observable<Context>;
  weekData$: Observable<TimesheetWeek>;
  eod: HM;
  now: HM;

  constructor(private store: Store<fromRoot.State>) {
    this.context$ = this.store.select(fromRoot.getContext);
    this.weekData$ = this.store.select(fromRoot.getTimesheetState);
  }

  ngOnInit() {
    this.context$
      .subscribe(updated => {
        this.setHours(updated);
        this.store.dispatch(new timesheetActions.FetchWeekAction());
      });
  }

  hideTimelineHelp() {
    this.store.dispatch(new contextActions.HideTimelineHelpAction());
  }
  hideWeekHelp() {
    this.store.dispatch(new contextActions.HideWeekHelpAction());
  }

  gotoSettings() {
    this.store.dispatch(go('/settings'));
  }

  newDate(val: Date) {
    this.store.dispatch(new timesheetActions.ResetWeekAction(val));
    this.store.dispatch(new timesheetActions.FetchWeekAction());
  }

  setHours(context: Context) {
    if (context.today) {
      this.eod = context.today.hoursLessLunch;
    }
    if (context.now) {
      this.now = context.now.hoursLessLunch;
    } else {
      this.now = new HM('0:00');
    }
  }
}
