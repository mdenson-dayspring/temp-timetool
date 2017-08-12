import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Context, HM, Today } from '../../models';

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

  constructor(private $fb: FormBuilder) {
    this.form = this.$fb.group({
      arrive: undefined,
      lunch: undefined,
      leave: undefined
    });

  }

  ngOnChanges() {
    if (this.today) {
      this._setup(this.now, this.today);

      this.form.get('arrive').setValue(this.today.arrive);
      this.form.get('lunch').setValue(this.today.lunch);
      this.form.get('leave').setValue(this.today.leave);
    }
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
        console.log('am');
        amPerc = Math.round(now.hours.minutes / totalMin * 100);
        this.timeWorked = now.hours.toString();
      } else if (now.leave.minutes < afterLunch.minutes) {
        console.log('lunch');
        amPerc = Math.round(noonMinutes.minutes / totalMin * 100);
        let lunch = now.hours.sub(noonMinutes).minutes;
        lunchPerc = Math.round(lunch / totalMin * 100);
        this.timeWorked = noonMinutes.toString();
      } else {
        console.log('pm');
        amPerc = Math.round(noonMinutes.minutes / totalMin * 100);
        lunchPerc = Math.round(now.lunch.minutes / totalMin * 100);
        let pm = now.hoursLessLunch.sub(noonMinutes).minutes;
        pmPerc = Math.round(pm / totalMin * 100);
      }
      console.log(amPerc, lunchPerc, pmPerc);
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
