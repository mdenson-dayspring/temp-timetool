import { Component, OnInit } from '@angular/core';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Context, DayInfo, HM } from '../../models';
import * as fromRoot from '../../store';
import * as contextActions from '../../store/context/context.actions';
import { FetchWeekAction } from '../../store/timesheet/timesheet.actions';

@Component({
  template: require('./now.page.html'),
  selector: 'now-summary'
})
export class NowPage implements OnInit {
  context$: Observable<Context>;
  weekData$: Observable<DayInfo[]>;
  eod: HM;
  now: HM;

  constructor(private store: Store<fromRoot.State>) {
    this.context$ = this.store.select(fromRoot.getContext);
    this.weekData$ = this.store.select(fromRoot.getWeek);
  }

  ngOnInit() {
    this.context$
      .subscribe(updated => {
        this.setHours(updated);
        this.store.dispatch(new FetchWeekAction());
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
