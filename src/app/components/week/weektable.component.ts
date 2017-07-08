import { Component, Input } from '@angular/core';
import { DayInfo, HM } from '../../models';

@Component({
    template: require('./weektable.component.html'),
    styles: [require('./weektable.component.css')],
    selector: 'weektable'
})
export class WeekTableComponent {
    private _content: DayInfo[];
    private _todayNdx: number;

    @Input()
    set dayOfWeek(dow: number) {
        this._todayNdx = dow;
    }

    @Input()
    set content(c: DayInfo[]) {
        console.log('Setting content ...');

        let totalGoal: number = 0;
        let totalActual: number = 0;
        let dataList: any = c
            .map((day, ndx) => {
                if (day.show()) {
                    totalGoal += day.getGoal().minutes;
                    let printEstimate = false;
                    let diffSign = 0;
                    if (ndx >= this._todayNdx && day.getActual() === undefined) {
                        totalActual += day.getGoal().minutes;
                        printEstimate = true;
                    } else if (day.getActual() !== undefined) {
                        totalActual += day.getActual().minutes;
                    } else if (day.getActual() === undefined) {
                        day.setActual(new HM(0));
                    }
                    return {
                        name: day.name,
                        hours:    day.getHours(printEstimate),
                        diff:     day.getDiff(printEstimate),
                        diffSign: day.getDiffSign(printEstimate),
                        today:    (ndx === this._todayNdx),
                        totals:   false
                    };
                }
            })
            .filter(item => {
                return (item !== undefined);
            });
        let totalDI = new DayInfo('Total', new HM(totalGoal), new HM(totalActual));
        dataList.push({
            name:     'Total',
            hours:    totalDI.getHours(false),
            diff:     totalDI.getDiff(false),
            diffSign: totalDI.getDiffSign(false),
            today:    false,
            totals:   true
        });
        this._content = dataList;
    }

    constructor() {
        console.log('Constructing WeekTableComponent');
    }
}
