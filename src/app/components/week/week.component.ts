import { Component, Input, OnInit } from '@angular/core';

import { DayOfWeek, Context, DayInfo, HM } from '../../models';
import { TimesheetService } from '../../services';

@Component({
    template: require('./week.component.html'),
    selector: 'week-summary'
})
export class WeekComponent implements OnInit {
    todayDoW: number;
    week: DayInfo[];

    private today: Date;
    private _showNow: boolean = false;
    private todayHoursHM: HM;

    // private _appContext: Context;

    @Input()
    set todayHours(hours: number) {
        this.today = new Date();
        this.todayDoW = this.today.getDay();
        this.todayHoursHM = new HM(hours);

        // let staff = this._appState.getContext().staff;

        // this._timesheetService.loadTimeData(this.today, staff);
    }

    get todayHoursDisplay(): string {
        return this.todayHoursHM.toString();
    }

    get todayDate(): string {
        function pad(s: number) {
            return (s < 10) ? '0' + s : s;
        }
        let d = this.today;
        return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/');
    }


    constructor(
        // private _appState: AppState,
        private _timesheetService: TimesheetService
    ) {
        this.today = new Date();
        this.todayDoW = this.today.getDay();
    }

    ngOnInit() {
        this._timesheetService.week$.subscribe(updated => {
            this.fillHours(updated);
        });

    }

    private fillHours(weekActuals: any[]) {
        // let context = this._appState.getContext();
        // let week: DayInfo[] = [
        //     new DayInfo('Sunday', context.goals[DayOfWeek.SUN]),
        //     new DayInfo('Monday', context.goals[DayOfWeek.MON]),
        //     new DayInfo('Tuesday', context.goals[DayOfWeek.TUE]),
        //     new DayInfo('Wednesday', context.goals[DayOfWeek.WED]),
        //     new DayInfo('Thursday', context.goals[DayOfWeek.THU]),
        //     new DayInfo('Friday', context.goals[DayOfWeek.FRI]),
        //     new DayInfo('Saturday', context.goals[DayOfWeek.SAT])
        // ];

        // weekActuals.forEach(actual => {
        //     week[actual.day_of_week].setActual(new HM(actual.minutes));
        // });

        // if (week[this.todayDoW].getActual() === undefined) {
        //     week[this.todayDoW].setActual(this.todayHoursHM);
        // }

        // this.week = week;
    }
}
