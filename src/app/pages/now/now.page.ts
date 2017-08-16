import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Context, DayInfo, HM } from '../../models';
import * as fromRoot from '../../store';

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
      });

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
