import {
  Component,
  Input,
  OnChanges,
  forwardRef,
  Pipe,
  PipeTransform
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Logger, Level } from 'angular2-logger/core';
import * as moment from 'moment';

let nextId = 0;

const DATE_FORMAT = 'M/D/Y';

@Pipe({
    name: 'datestamp'
})
export class DateStampPipe implements PipeTransform {
  transform(value: Date|moment.Moment): string {
    if (value) {
      if (moment.isMoment(value)) {
        return value.format(DATE_FORMAT);
      } else {
        return moment(value).format(DATE_FORMAT);
      }
    } else {
      return '';
    }
  }
}
@Component({
  selector: 'input-date',
  template: `
<button
  type="button"
  class="slds-button slds-button_neutral"
  title="Change Date"
  (click)="togglePicker()">
  {{ dateMoment | datestamp }}
  <svg class="slds-button__icon slds-button__icon_right" aria-hidden="true">
    <use xlink:href="#edit"></use>
  </svg>
  <span class="slds-assistive-text">Change Date</span>
</button>
<datepicker *ngIf="showPicker" [start]="dateMoment" (picked)="closePicker($event)"></datepicker>
`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements OnChanges, ControlValueAccessor {
  @Input() id = 'input-date-' + ++nextId;
  @Input() name: string;

  private showPicker = false;

  private _dateMoment: moment.Moment;
  private get dateValue(): Date {
    if (this._dateMoment) {
      return this._dateMoment.toDate();
    } else {
      return undefined;
    }
  }
  private set dateValue(val: Date) {
    this._dateMoment = this.fixDate(val);
    this.$log.debug('[InputDateComponent.set dateValue]', this.dateValue);
    this.propagateChange(this.dateValue);
  }

  private get dateMoment(): moment.Moment {
    return this._dateMoment;
  }
  private set dateMoment(val: moment.Moment) {
    this._dateMoment = this.fixDate(val);
    this.propagateChange(this.dateValue);
  }

  constructor(private $log: Logger) {
    this._dateMoment = this.fixDate(undefined);
  }

  ngOnChanges() {
  }

  togglePicker() {
    this.showPicker = !this.showPicker;
  }
  closePicker(newMoment: moment.Moment) {
    this.showPicker = false;
    this.dateMoment = newMoment;
  }

  //
  // ControlValueAccessor interface writeValue(), registerOnChange(), registerOnTouched()
  //
  writeValue(inputDate: Date): void {
    this.$log.debug('[InputDateComponent(' + this.name + ').writeValue] inputDate', inputDate);
    this.dateValue = inputDate;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
    this.propagateChange(this.dateValue);
  }
  registerOnTouched(fn: any): void { }

  private propagateChange = (_: any) => { };

  private fixDate(val: Date|moment.Moment): moment.Moment {
    if (!val) {
      val = moment();
    } else if (moment.isDate(val)) {
      val = moment(val);
    }
    return moment(val.format('YYYY-MM-DD')); // truncate time
  }
}
