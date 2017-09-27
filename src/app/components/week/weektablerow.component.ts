import { Component, Input } from '@angular/core';
import { Logger } from 'angular2-logger/core';

import { DayInfo, HM } from '../../models';

@Component({
    template: require('./weektablerow.component.html'),
    styles: [ require('./weektablerow.component.scss') ],
    selector: '[weektable-row]'
})
export class WeekTableRowComponent {
    @Input('weektable-row') content: DayInfo;

    constructor(private $log: Logger) { }
}
