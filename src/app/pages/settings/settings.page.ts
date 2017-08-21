import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Rx';

import { DayOfWeek, Context, HM } from '../../models';
import * as fromRoot from '../../store';
import { UpdateSettingsAction } from '../../store/context/context.actions';

import * as dsvalidator from '../../form-validators';

@Component({
  template: require('./settings.page.html'),
  styles: [require('./settings.page.scss')],
  selector: 'settings'
})
export class SettingsPage {
  private settingsForm: FormGroup;
  private dayLabels: string[];
  private totalHours: string;

  constructor(
    private $log: Logger,
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
            dsvalidator.isaTime
          ]],
          'lunch': [context.expected.lunch, [
            Validators.required,
            dsvalidator.isaTime
          ]],
          'leave': [context.expected.leave, [
            Validators.required,
            dsvalidator.isaTime
          ]],
          'staff': [context.staff, [
            Validators.required
          ]],
          'goals': fb.array([

          ])
        });

        const goals = <FormArray>this.settingsForm.controls.goals;
        this.dayLabels.forEach((label, index) => {
          goals.push(fb.control(context.goals[index], dsvalidator.isaTime));
        });
        this.$log.debug(goals);

        this.calcTotal(context.goals);
      });

    this.settingsForm.valueChanges
      .debounceTime(500)
      .filter((value) => this.settingsForm.valid)
      .subscribe((value) => {
        this.save(value);
      });
  }

  private save(form: any) {
    const newContext = new Context();
    newContext.staff = form.staff;
    newContext.goals = form.goals;
    this.calcTotal(newContext.goals);
    this.store.dispatch(new UpdateSettingsAction(newContext));
  }

  private calcTotal(goals: string[]) {
    let minutes = goals
      .map(g => g ? (new HM(g)).minutes : 0)
      .reduce((g, sum) => sum + g);
    this.totalHours = (new HM(minutes)).toString();
  }
}
