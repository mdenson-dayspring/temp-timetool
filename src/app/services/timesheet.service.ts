import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Logger } from 'angular2-logger/core';
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';

import * as fromRoot from '../store';
import { DayInfo, HM } from '../models';

const BASE_URL = '/timesheetPHP/staff/staff_json.php';

@Injectable()
export class TimesheetService {
  private staff: string;
  private weekDate: string;
  private subs: Subscription[] = [];

  // Using Angular DI we use the HTTP service
  constructor(private $http: Http,
    private store: Store<fromRoot.State>,
    private $log: Logger) {
    this.subs.push(store.select(fromRoot.getContext)
      .subscribe(context => {
        this.staff = context.staff;
      }));
    this.subs.push(store.select(fromRoot.getTimesheetState)
      .map(state => state.date)
      .filter(date => date !== undefined)
      .subscribe(date => {
        this.weekDate = this._isoDate(date);
      }));
  }

  fetchTimeData(): Observable<DayInfo[]> {
    return Observable.create((subscriber: Subscriber<DayInfo[]>) => {
      this.$log.debug('[TimesheetService.fetchTimeData]', this.staff, this.weekDate);
      if (this.staff) {
        let url = BASE_URL + '?staff=' + this.staff + '&today=' + this.weekDate;
        if (process.env.ENV !== 'production') {
          url = 'public/data/staff.json';
        }
        this.$http.get(url)
          .map(response => response.json())
          .subscribe(data => {
            const dayList = data.map((day: {[key: string]: any}) => {
              return new DayInfo(day.day_of_week, undefined, new HM(day.minutes));
            });
            subscriber.next(dayList);
            subscriber.complete();
          }, error => this.$log.error('Could not load week.'));
      } else {
        subscriber.complete();
        this.$log.warn('Staff member is not set.');
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(element => {
      if (element) { element.unsubscribe(); }
    });
  }

  private _isoDate(d: Date) {
    function pad(s: number): String {
      return (s < 10) ? '0' + s : '' + s;
    }
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
}
