import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,

  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,

} from 'redux/constants.js';

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    payload: data
  }
}

export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}
export function registerRequest() {
  return {
    type: REGISTER_REQUEST,
  }
}
export function registerFailure() {
  return {
    type: REGISTER_FAILURE,
  }
}

export function logoutRequest(data) {
  return {
    type: LOGOUT_REQUEST,
    payload: data
  }
}

export function logoutSuccess(data) {
  return {
    type: LOGOUT_SUCCESS,
    payload: data
  }
}