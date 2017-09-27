import { Component, Input, OnChanges } from '@angular/core';
import { Logger } from 'angular2-logger/core';

import { DayOfWeek, Context, DayInfo, HM } from '../../models';
import { TimesheetService } from '../../services';
import * as moment from 'moment';

@Component({
  template: require('./week.component.html'),
  selector: 'week-summary'
})
export class WeekComponent implements OnChanges {
  @Input() mode = 'eod';
  @Input() nowHours: HM;
  @Input() actuals: DayInfo[];
  @Input() goals: HM[];
  todayDoW: number;
  week: DayInfo[];

  private titleDate: string;
  private weekMoment: moment.Moment;

  private allowModeSwitch = false;
  private today: Date;
  private _showNow: boolean = false;
  private todayHoursHM: HM;

  @Input()
  set todayHours(hours: HM) {
    this.today = new Date();
    this.todayDoW = this.today.getDay();
    this.todayHoursHM = hours;
  }

  get todayHoursDisplay(): string {
    return this.todayHoursHM.toString();
  }
  @Input('week')
  set weekDate(val: Date) {
    console.log('weekDate', val);
    if (!val) {
      this.titleDate = '';
      this.weekMoment = undefined;
    } else {
      this.titleDate = [val.getMonth() + 1, val.getDate(), val.getFullYear()].join('/');
      this.weekMoment = moment(val);
    }
  }

  constructor(private $log: Logger) {
    this.today = new Date();
    this.todayDoW = this.today.getDay();
  }

  onClick() {
    if (this.allowModeSwitch) {
      this.mode = (this.mode === 'now' ? 'eod' : 'now');
      this.$log.debug('Mode Change: mode changed to "' + this.mode + '"');
      this.week[this.todayDoW] = this.prepToday(this.week[this.todayDoW]);

      this.week = Object.assign([], this.week);
    }
  }

  ngOnChanges() {
    this.$log.debug('[week.component] ngOnChanges');
    if (this.actuals && this.goals) {
      this.fillHours(this.actuals, this.goals);
    }
  }

  private fillHours(weekActuals: DayInfo[], goals: HM[]) {
    this.$log.debug('[week.component] fillHours');
    let week: DayInfo[] = [
      new DayInfo(DayOfWeek.SUN, goals[DayOfWeek.SUN]),
      new DayInfo(DayOfWeek.MON, goals[DayOfWeek.MON]),
      new DayInfo(DayOfWeek.TUE, goals[DayOfWeek.TUE]),
      new DayInfo(DayOfWeek.WED, goals[DayOfWeek.WED]),
      new DayInfo(DayOfWeek.THU, goals[DayOfWeek.THU]),
      new DayInfo(DayOfWeek.FRI, goals[DayOfWeek.FRI]),
      new DayInfo(DayOfWeek.SAT, goals[DayOfWeek.SAT])
    ];

    weekActuals.forEach(actual => {
      week[actual.dayOfWeek].setActual(new HM(actual.actual));
    });

    if (week[this.todayDoW].actual === undefined) {
      this.allowModeSwitch = true;
      this.prepToday(week[this.todayDoW]);
    }
    this.week = week;
  }

  private prepToday(day: DayInfo) {
    if (this.mode === 'now') {
      day.setActual(this.nowHours);
      day.name = 'Hours right now';
    } else {
      day.setActual(this.todayHoursHM);
      day.name = 'At end of Today';
    }
    return Object.assign(new DayInfo(), day);
  }
}
