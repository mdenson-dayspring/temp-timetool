import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { DayInfo, HM } from '../../models';

@Component({
  template: require('./weektable.component.html'),
  styles: [ require('./weektable.component.scss') ],
  selector: 'weektable'
})
export class WeekTableComponent {
  @Output() clicked: EventEmitter<boolean> = new EventEmitter();
  private week: {[key: string]: any};
  private _todayNdx: number;

  @Input()
  set dayOfWeek(dow: number) {
    this.$log.debug('[WeekTableComponent] dayOfWeek', dow);
    this._todayNdx = dow;
  }

  @Input()
  set content(c: DayInfo[]) {
    this.$log.debug('[WeekTableComponent] content');

    let totalGoal: number = 0;
    let totalActual: number = 0;
    let dataList: any = c
      .map((day, ndx) => {
        if (day.show()) {
          totalGoal += day.goal.minutes;
          let printEstimate = false;
          let diffSign = 0;
          if (ndx >= this._todayNdx && day.actual === undefined) {
            totalActual += day.goal.minutes;
            printEstimate = true;
          } else if (day.actual !== undefined) {
            totalActual += day.actual.minutes;
          } else if (day.actual === undefined) {
            day.setActual(new HM(0));
          }
          return {
            name: day.name,
            dayOfWeek: day.dayOfWeek,
            goal: day.goal,
            hours: day.getHours(printEstimate),
            diff: day.getDiff(printEstimate),
            diffSign: day.getDiffSign(printEstimate),
            today: (ndx === this._todayNdx),
            totals: false
          };
        }
      })
      .filter(item => {
        return (item !== undefined);
      });
    let totalDI = new DayInfo(undefined, new HM(totalGoal), new HM(totalActual));
    totalDI.name = 'Total';
    dataList.push({
      name: 'Total',
      dayOfWeek: totalDI.dayOfWeek,
      goal: totalDI.goal,
      hours: totalDI.getHours(false),
      diff: totalDI.getDiff(false),
      diffSign: totalDI.getDiffSign(false),
      today: false,
      totals: true
    });
    this.week = dataList;
  }

  constructor(private $log: Logger) {
    this.$log.debug('[WeekTableComponent] constructor');
  }

  onClick(dow: number) {
    if (dow === this._todayNdx) {
      this.clicked.emit(true);
    }
  }
}
