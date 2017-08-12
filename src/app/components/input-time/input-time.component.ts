import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  forwardRef,
  Pipe,
  PipeTransform
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Observable';

import { HM } from '../../models';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: HM): string {
    if (value) {
      return value.toString();
    } else {
      return '';
    }
  }
}

@Component({
  selector: 'input-time',
  template: `
<span *ngIf="!editMode" (click)="startEdit()">{{ value | time }}</span>
<input *ngIf="editMode" value="{{ value.toString() }}" style="width: 3rem; text-align: right;"/>
`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTimeComponent),
      multi: true
    }
  ]
})
export class InputTimeComponent implements OnChanges, ControlValueAccessor {
  @Input() name: string;
  @Input() editMode: boolean = false;

  private value: HM;

  constructor(private $log: Logger) { }

  startEdit() {
    this.editMode = true;
  }

  ngOnChanges() {
  }
  writeValue(val: HM): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }

  private propagateChange = (_: any) => { };
}
