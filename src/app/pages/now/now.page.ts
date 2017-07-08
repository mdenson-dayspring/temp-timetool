import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Context, DayInfo } from '../../models';
import * as fromRoot from '../../store';

@Component({
  template: require('./now.page.html'),
  selector: 'now-summary'
})
export class NowPage implements OnInit {
  context$: Observable<Context>;
  hours: string;

  constructor(private store: Store<fromRoot.State>) {
    this.context$ = this.store.select(fromRoot.getContext);
  }

  ngOnInit() {
    this.context$
      .subscribe(updated => {
        this.setHours(updated);
      });

  }
  setHours(context: Context) {
    if (context.now) {
      this.hours = context.now.hoursLessLunch.toString();
    } else {
      this.hours = '0:00';
    }
  }
}
