import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { DayOfWeek, Context } from '../../models';
import * as fromRoot from '../../store';

@Component({
  template: require('./settings.page.html'),
  styles: [require('./settings.page.scss')],
  selector: 'settings'
})
export class SettingsPage {
  private settingsForm: FormGroup;
  private dayLabels: string[];

  constructor(
    private store: Store<fromRoot.State>,
    fb: FormBuilder) {
    this.dayLabels = [];
    this.dayLabels[DayOfWeek.SUN] = 'Sunday';
    this.dayLabels[DayOfWeek.MON] = 'Monday';
    this.dayLabels[DayOfWeek.TUE] = 'Tuesday';
    this.dayLabels[DayOfWeek.WED] = 'Wednesday';
    this.dayLabels[DayOfWeek.THU] = 'Thursday';
    this.dayLabels[DayOfWeek.FRI] = 'Friday';
    this.dayLabels[DayOfWeek.SAT] = 'Saturday';

    this.store.select(fromRoot.getContext)
      .filter(context => context !== undefined)
      .first()
      .subscribe(context => {
        this.settingsForm = fb.group({
          'arrive': [context.expected.arrive, [
            Validators.required,
            Validators.pattern('[0-9]+:[0-9][0-9]')
          ]],
          'lunch': [context.expected.lunch, [
            Validators.required,
            Validators.pattern('[0-9]+:[0-9][0-9]')
          ]],
          'leave': [context.expected.leave, [
            Validators.required,
            Validators.pattern('[0-9]+:[0-9][0-9]')
          ]],
          'staff': [context.staff, [
            Validators.required
          ]],
          'goals': fb.array([

          ])
        });

        const goals = <FormArray>this.settingsForm.controls.logs;
        // this.dayLabels.forEach((label, index) => {
        //   goals.push([
        //     context.goals[index],
        //     Validators.pattern('[0-9]+:[0-9][0-9]')
        //   settingsForm]);
        // });
      });

    this.settingsForm.valueChanges
      .debounceTime(500)
      .filter((value) => this.settingsForm.valid)
      .subscribe((value) => {
        this.save(value);
      });
  }

  private save(form: any) {
    // this.context.expected.arrive = form.arrive;
    // this.context.expected.lunch = form.lunch;
    // this.context.expected.leave = form.leave;
    //
    // this.context.staff = form.staff;
    //
    // for (let i = 0; i < 7; i++) {
    //   this.context.goals[i] = form[this.dayLabels[i]];
    // }
    //
    // this._appState.save(this.context);
  }
}
