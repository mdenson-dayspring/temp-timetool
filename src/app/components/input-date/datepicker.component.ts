import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { Logger, Level } from 'angular2-logger/core';
import * as moment from 'moment';

let nextId = 0;

@Component({
  selector: 'datepicker',
  template: require('./datepicker.component.html'),
  styles: [ require('./datepicker.component.scss') ]
})
export class DatepickerComponent implements OnChanges {
  @Input() id = 'input-date-' + ++nextId;
  @Input() start: moment.Moment;
  @Output() picked: EventEmitter<moment.Moment> = new EventEmitter();

  private today: moment.Moment;
  private viewRefDate: moment.Moment;
  private viewYears: number[];
  private viewDays: moment.Moment[];

  constructor(private $log: Logger) {
    let val = moment();
    this.today = moment(val.format('YYYY-MM-DD')); // truncate time
  }

  forwardMonth() {
    const tmp = moment(this.viewRefDate);
    this.$log.debug(tmp === this.viewRefDate);
    tmp.add(1, 'month');
    this.prepView(tmp);
  }
  backMonth() {
    const tmp = moment(this.viewRefDate);
    tmp.subtract(1, 'month');
    this.prepView(tmp);
  }
  onYearChange(val: any) {
    this.$log.debug(val.target.value);
    const tmp = moment(this.viewRefDate);
    tmp.year(val.target.value);
    this.prepView(tmp);
  }
  onClick(val: moment.Moment) {
    this.picked.emit(val);
  }
  ngOnChanges() {
    this.$log.debug('[' + this.id + '].ngOnChanges() start',
      this.start ? this.start.format() : 'undefined');
    this.prepView(this.start);
  }

  prepView(val: moment.Moment) {
    this.$log.debug('prepView val', val.format());
    let test = moment(val.format('YYYY-MM-DD')); // clone and truncate time info
    test.date(1);
    if (test.isSame(this.viewRefDate)) {
      return;
    }
    this.viewRefDate = moment(test);
    this.$log.debug('ref date ', this.viewRefDate.format());

    let days = [] as moment.Moment[];
    test.subtract((test.isoWeekday() % 7), 'day'); // get Sunday
    this.$log.debug('first date ', test.format());

    const nextMonth = moment(this.viewRefDate);
    nextMonth.add(1, 'month');
    this.$log.debug('Next Month ', nextMonth.format());
    do {
      for (let i = 0; i < 7; i++) {
        days.push(moment(test));
        test.add(1, 'day');
      }
      this.$log.debug('week ', test.format());
    } while (nextMonth.isAfter(test));
    this.viewDays = days;

    const yearNum = this.viewRefDate.year();
    let years = [] as number[];
    for (let i = yearNum - 17; i < yearNum + 17; i++) {
      years.push(i);
    }
    this.viewYears = years;
    this.$log.debug('weeks', this.viewRefDate, this.viewYears, this.viewDays);
  }
}
