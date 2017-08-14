import { createSelector } from 'reselect';
import { Context, Today, HM, TodayTimes } from '../../models';
import * as contextActions from './context.actions';

export interface State {
  context: Context;
}

const initialState: State = {
  context: new Context()
};

export function reducer(state = initialState, action: contextActions.Actions): State {
  switch (action.type) {
    case contextActions.ACTION.LOAD_PAGE:
      return Object.assign({}, state, {
        context: updateNow(state.context, (<contextActions.LoadPageAction>action).payload)
      });
    case contextActions.ACTION.TICK:
      return Object.assign({}, state, {
        context: updateNow(state.context, (<contextActions.TickAction>action).payload)
      });

    case contextActions.ACTION.UPDATE_EXPECTED:
      return Object.assign({}, state, {
        context: updateExpected(
          state.context,
          (<contextActions.UpdateExpectedAction>action).payload
        )
      });

    default:
      return state;
  }
}

function updateExpected(context: Context, newTimes: TodayTimes): Context {
  const nowHM = context.now.leave;
  context = Object.assign(new Context(), context, {expected : newTimes});
  return updateNow(context, nowHM);
}

function updateNow(context: Context, nowHM: HM): Context {
  return Object.assign(new Context(), context, {
    today: new Today(
      new HM(context.expected.arrive),
      new HM(context.expected.lunch),
      new HM(context.expected.leave)),
    now: new Today(
      new HM(context.expected.arrive),
      new HM(context.expected.lunch),
      nowHM)
  });
}

export const getContextState = (state: State) => state;
export const getContext = (state: State) => state.context;
