import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import { checkStatus, accountIdUrl, accountInfoUrl } from '../shared/utils';

/* ////////////////////////////////
//        Account Actions        //
////////////////////////////////*/
/*
AccountID
  - *Needs authToken*
  - URI: api.robinhood.com/user/id/
  - Method: GET
  - Sample Response:
    {
      "username": "superman",
      "url": "https://api.robinhood.com/user/id/",
      "id": "11deface-face-face-face-defacedeface11"
    }

AccountInfo
  - *Needs authToken*
  - URI: api.robinhood.com/user/basic_info/
  - Method: GET
  - Sample Response:
    {
      "phone_number": "2125550030",
      "city": "New York",
      "number_dependents": 2,
      "citizenship": "US",
      "updated_at": "2016-03-13T12:18:02.820164Z",
      "marital_status": "married",
      "zipcode": "10001",
      "country_of_residence": "US",
      "state": "NY",
      "date_of_birth": "1978-12-18",
      "user": "https://api.robinhood.com/user/",
      "address": "320 10th Av",
      "tax_id_ssn": "0001"
    }
*/

function requestAccountID(authToken) {
  return {
    type: types.REQUEST_ACCOUNT_ID,
    authToken,
  };
}

function recieveAccountID(response) {
  return {
    type: types.RECIEVE_ACCOUNT_ID,
    response,
    recievedAt: Date.now(),
  };
}

function fetchAccountID(authToken) {
  return dispatch => {
    dispatch(requestAccountID(authToken))
    return fetch(accountIdUrl(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json, */*',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(recieveAccountID(json)))
  };
}

function shouldFetchAccountID(state, authToken) {
  const id = state.account.id;
  if (_.isEmpty(id)) {
    return true;
  }
  if (id.isFetching) {
    return false;
  }
  return true;
}

export function fetchAccountIdIfNeeded(authToken) {
  return (dispatch, getState) => {
    if (shouldFetchAccountID(getState(), authToken)) {
      return dispatch(fetchAccountID(authToken))
    }
  };
}

function requestAccountInfo(authToken) {
  return: {
    type: types.REQUEST_ACCOUNT_INFO,
    authToken
  };
}

function recieveAccountInfo(response) {
  return: {
    type: types.RECIEVE_ACCOUNT_INFO,
    response
    recievedAt: Date.now()
  };
}

function fetchAccountInfo(authToken) {
  return dispatch => {
    dispatch(requestAccountInfo(authToken))
    return fetch(accountInfoUrl(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json, */*',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(recieveAccountInfo(json)))
  }
}

function shouldFetchAccountInfo(state, authToken) {
  const info = state.account.info;

  if (_.isEmpty(info)) {
    return true;
  }
  if (accountInfo.isFetching) {
    return false;
  }
  return fetchAccountInfo(authToken);
}

export function fetchAccountInfoIfNeeded(authToken) {
  return (dispatch, getState) => {
    if (shouldFetchAccountInfo(getState(), authToken)) {
      return dispatch(fetchAccountInfo(authToken))
    }
  }
}
