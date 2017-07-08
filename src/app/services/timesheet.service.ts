import {Injectable} from '@angular/core';

import { Http } from '@angular/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { DayInfo } from '../models';

@Injectable()
export class TimesheetService {
    week$: Subject<DayInfo[]>;
    private baseUrl: string;
    private dataStore: {  // This is where we will store our data in memory
        week: DayInfo[]
    };

    // Using Angular DI we use the HTTP service
    constructor(private http: Http) {
        this.baseUrl = 'http://malachi/timesheetPHP/staff/staff_json.php';
        this.dataStore = { week: [] };
        this.week$ = <Subject<DayInfo[]>>new BehaviorSubject( [] );
    }

    loadTimeData(today: Date, staff: string) {
        let todaystr = this._isoDate(today);
        let url = this.baseUrl + '?staff=' + staff + '&today=' + todaystr;
        this.http.get(url)
            .map(response => response.json())
            .subscribe(data => {
                this.dataStore.week = data;
                this.week$.next(this.dataStore.week);
            }, error => console.log('Could not load week.'));
    }

    private _isoDate(d: Date) {
        function pad(s: number): String {
            return (s < 10) ? '0' + s : '' + s;
        }
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    }
}
