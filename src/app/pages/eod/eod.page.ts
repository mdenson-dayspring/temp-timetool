import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Context } from '../../models';
import * as fromRoot from '../../store';


@Component({
  template: require('./eod.page.html'),
  selector: 'eod-summary'
})
export class EodPage implements OnInit {
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
    if (context.today) {
      this.hours = context.today.hoursLessLunch.toString();
    }
  }
}
