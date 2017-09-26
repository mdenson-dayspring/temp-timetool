import { Action } from '@ngrx/store';
import { type } from '../util';

import { DayInfo } from '../../models';

export const ACTION = {
  RESET_WEEK: type('[Timesheet] Reset the Timesheet slice'),
  SET_WEEK:   type('[Timesheet] Update store with week info.'),
  FETCH_WEEK: type('[Expense] Fetch week from Timesheet.')
};

export class ResetWeekAction implements Action {
  type = ACTION.RESET_WEEK;
  public payload: Date;

  // payload is the date of the Monday? of the week
  constructor(payload: Date = new Date()) {
    this.payload = new Date(_canonicalDate(payload));
  }
}

export class SetWeekAction implements Action {
  type = ACTION.SET_WEEK;

  constructor(public payload: DayInfo[]) { }
}

export class FetchWeekAction implements Action {
  type = ACTION.FETCH_WEEK;
}

export type Actions
  = ResetWeekAction
  | SetWeekAction
  | FetchWeekAction;

function _canonicalDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
}
