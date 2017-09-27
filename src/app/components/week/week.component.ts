import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { Logger } from 'angular2-logger/core';

import { DayOfWeek, Context, DayInfo, HM } from '../../models';
import { TimesheetService } from '../../services';
import * as moment from 'moment';

@Component({
  template: require('./week.component.html'),
  styles: [ require('./week.component.scss') ],
  selector: 'week-summary'
})
export class WeekComponent implements OnChanges {
  @Input() mode = 'eod';
  @Input() nowHours: HM;
  @Input() actuals: DayInfo[];
  @Output() dateSelected: EventEmitter<Date> = new EventEmitter();
  todayDoW: number;
  week: DayInfo[];

  private context: Context;
  private goals: HM[];
  private titleDate: string;
  private weekMoment: moment.Moment;
  private showPicker: boolean = false;

  private allowModeSwitch = false;
  private today: moment.Moment;
  private _showNow: boolean = false;
  private todayHoursHM: HM;

  @Input('context') set _context(val: Context) {
    this.context = val;
    if (val) {
      this.goals = val.goals.map(g => g === '' ? undefined : new HM(g));
    }
  }
  @Input() set todayHours(hours: HM) {
    this.todayHoursHM = hours;
  }

  get todayHoursDisplay(): string {
    return this.todayHoursHM.toString();
  }
  @Input('week')
  set weekDate(val: Date) {
    if (!val) {
      this.titleDate = '';
      this.weekMoment = undefined;
      this.todayDoW = undefined;
    } else {
      this.weekMoment = moment(val);
      this.titleDate = this.weekMoment.format('M/D/YYYY');
      this.todayDoW = this.today.diff(this.weekMoment, 'days');
    }
  }

  constructor(private $log: Logger) {
    this.today = moment();
  }

  todayRowClicked() {
    if (this.allowModeSwitch) {
      this.mode = (this.mode === 'now' ? 'eod' : 'now');
      this.$log.debug('Mode Change: mode changed to "' + this.mode + '"');
      this.week[this.todayDoW] = this.prepToday(this.week[this.todayDoW]);

      this.week = Object.assign([], this.week);
    }
  }

  ngOnChanges() {
    if (this.actuals && this.goals) {
      this.fillHours(this.actuals, this.goals);
    }
  }

  private toggleDatepicker() {
    this.showPicker = !this.showPicker;
  }
  private datePicked(val: moment.Moment) {
    this.dateSelected.emit(val.toDate());
    this.showPicker = false;
  }

  private fillHours(weekActuals: DayInfo[], goals: HM[]) {
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

    this.allowModeSwitch = false;
    if (week[this.todayDoW] && week[this.todayDoW].actual === undefined) {
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
