import { Action } from '@ngrx/store';
import { type } from '../util';

import { Context, HM, TodayTimes } from '../../models';

export const ACTION = {
  LOAD_PAGE:  type('[Context] Load Page'),
  TICK:  type('[Context] Tick'),
  UPDATE_EXPECTED:  type('[Context] Update Expected Times'),
  UPDATE_SETTINGS:  type('[Context] Update Settings'),
  HIDE_TIMELINE_HELP:  type('[Context] Hide Timeline Help'),
  HIDE_WEEK_HELP:  type('[Context] Hide Week Help')
};

export class LoadPageAction implements Action {
  type = ACTION.LOAD_PAGE;
  constructor(public payload: HM) { }
}

export class TickAction implements Action {
  type = ACTION.TICK;
  constructor(public payload: HM) { }
}

export class UpdateExpectedAction implements Action {
  type = ACTION.UPDATE_EXPECTED;
  constructor(public payload: TodayTimes) { }
}

export class UpdateSettingsAction implements Action {
  type = ACTION.UPDATE_SETTINGS;
  constructor(public payload: Context) { }
}

export class HideTimelineHelpAction implements Action {
  type = ACTION.HIDE_TIMELINE_HELP;
}
export class HideWeekHelpAction implements Action {
  type = ACTION.HIDE_WEEK_HELP;
}

export type Actions
  = LoadPageAction
  | TickAction
  | UpdateExpectedAction
  | UpdateSettingsAction
  | HideTimelineHelpAction
  | HideWeekHelpAction;
