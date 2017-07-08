import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromContext from './context/context.reducer';

export interface State {
  context: fromContext.State;
  router: fromRouter.RouterState;
}

const reducers = {
  context: fromContext.reducer,
  router: fromRouter.routerReducer
};

const localStore = localStorageSync({ keys: ['context'], rehydrate: true });

const developmentReducer: ActionReducer<State> = compose(
  localStore,
  storeFreeze,
  combineReducers
)(reducers);
const productionReducer: ActionReducer<State> = compose(
  localStore,
  combineReducers
)(reducers);

export function reducer(state: any, action: any) {
  if (process.env.ENV === 'production') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getRouterPath = (state: State) => state.router.path;
export const getContextState = (state: State) => state.context;
export const getContext = createSelector(getContextState, fromContext.getContext);
