import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';

import * as fromRoot from '../../store';
import { UpdateExpectedAction } from '../../store/context/context.actions';

import { Context, HM, Today, TodayTimes } from '../../models';

@Component({
  template: require('./timeline.component.html'),
  styles: [require('./timeline.component.scss')],
  selector: 'timeline'
})
export class TimelineComponent implements OnChanges {
  @Input() now: Today;
  @Input() today: Today;
  timeWorked: string;
  timeTotal: string;
  timeLeft: string;
  am: string;
  lunch: string;
  pm: string;

  private form: FormGroup;
  private valueChangeSub: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private $fb: FormBuilder) {
    this.form = this.$fb.group({
      arrive: undefined,
      lunch: undefined,
      leave: undefined
    });
    this.startListener();
  }

  ngOnChanges() {
    if (this.today) {
      this._setup(this.now, this.today);

      this.stopListener();
      this.form.get('arrive').setValue(this.today.arrive);
      this.form.get('lunch').setValue(this.today.lunch);
      this.form.get('leave').setValue(this.today.leave);
      this.startListener();
    }
  }

  ngOnDestroy() {
    this.stopListener();
  }

  private stopListener() {
    if (this.valueChangeSub) {
      this.valueChangeSub.unsubscribe();
    }
  }
  private startListener() {
    this.valueChangeSub = this.form.valueChanges
      .filter(val => {
        return (
          this.form.value.arrive !== this.today.arrive ||
          this.form.value.lunch !== this.today.lunch ||
          this.form.value.leave !== this.today.leave
        );
      })
      .subscribe(_ => {
        const tt = new TodayTimes();
        tt.arrive = this.form.value.arrive.toString();
        tt.lunch = this.form.value.lunch.toString();
        tt.leave = this.form.value.leave.toString();
        this.store.dispatch(new UpdateExpectedAction(tt));
    } );
  }
  private _setup(now: Today, today: Today) {
    let amPerc: number = 0;
    let lunchPerc: number = 0;
    let pmPerc: number = 0;
    let noon = new HM('12:00');
    let afterLunch = noon.add(today.lunch);
    let noonMinutes = noon.sub(today.arrive);

    if (now) {
      this.timeWorked = now.hoursLessLunch.toString();
      this.timeTotal = now.hours.toString();
      this.timeLeft = today.timeLeft().toString();

      let totalMin = today.hours.minutes;
      if (now.leave.minutes < noon.minutes) {
        amPerc = Math.round(now.hours.minutes / totalMin * 100);
        this.timeWorked = now.hours.toString();
      } else if (now.leave.minutes < afterLunch.minutes) {
        amPerc = Math.round(noonMinutes.minutes / totalMin * 100);
        let lunch = now.hours.sub(noonMinutes).minutes;
        lunchPerc = Math.round(lunch / totalMin * 100);
        this.timeWorked = noonMinutes.toString();
      } else {
        amPerc = Math.round(noonMinutes.minutes / totalMin * 100);
        lunchPerc = Math.round(now.lunch.minutes / totalMin * 100);
        let pm = now.hoursLessLunch.sub(noonMinutes).minutes;
        pmPerc = Math.round(pm / totalMin * 100);
      }
      if (amPerc + lunchPerc + pmPerc > 100) {
        pmPerc = 100 - (amPerc + lunchPerc);
      }
      this.am = '' + amPerc + '%';
      this.lunch = '' + lunchPerc + '%';
      this.pm = '' + pmPerc + '%';
    } else {
      this.am = '0%';
      this.lunch = '0%';
      this.pm = '0%';
    }
  }
}
