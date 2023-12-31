/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable arrow-body-style */
import { createReducer,on } from '@ngrx/store';
import { appInitialState } from '../appInitialState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.actions';
import { IloginState } from './loginState';

const initialState: IloginState = appInitialState.login;


const reducer = createReducer(initialState,
  on(recoverPassword, currentState=>{
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),
  on(recoverPasswordSuccess, currentState=>{
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),
  on(recoverPasswordFail, (currentState, action)=>{
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),
  on(login, (currentState)=>{
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    };
  }),
  on(loginSuccess, (currentState)=>{
    return {
      ...currentState,
      isLoggedIn: true,
      isLoggingIn: false,
    };
  }),
  on(loginFail, (currentState, action)=>{
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false,
    };
  })
);

export function loginReducer(state: IloginState, action){
  return reducer(state, action);
}
