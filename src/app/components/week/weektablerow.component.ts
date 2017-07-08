import { Component, Input } from '@angular/core';
import { DayInfo, HM } from '../../models';

@Component({
    template: require('./weektablerow.component.html'),
    styles: [require('./weektablerow.component.css')],
    selector: '[weektable-row]'
})
export class WeekTableRowComponent {
    @Input('weektable-row') _content: DayInfo;

    constructor() { }
}
