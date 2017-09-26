import * as actions from './timesheet.actions';
import { DayInfo, DayOfWeek, HM, TimesheetWeek } from '../../models';

export type State = TimesheetWeek;

const initialState: State = {
  date: undefined,
  week: undefined
};

export function reducer(state = initialState, action: actions.Actions): State {

  switch (action.type) {
    case actions.ACTION.RESET_WEEK:
      if (!state.date ||
          state.date !== (<actions.ResetWeekAction>action).payload) {
        return Object.assign({}, state, {
          date: (<actions.ResetWeekAction>action).payload,
          week: undefined
        });
      } else {
        return state;
      }

    case actions.ACTION.SET_WEEK:
      return Object.assign({}, state, {
        week: (<actions.SetWeekAction>action).payload
      });


    default:
      return state;
  }

}

export const getWeek = (state: State) => state.week;
