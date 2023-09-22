import { put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  try {
    // const response = yield call(axios.post, '/tokens', payload);
    // axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    // yield put(actions.loginSuccess({ ...response.data }));

    const response = 'oi';
    if (
      payload.email !== 'rodrigoganchieta@gmail.com' &&
      payload.password !== '123456'
    ) {
      toast.error('Username or password is invalid.');
      yield put(actions.loginFailure());
      return;
    }

    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('You are logged in!');
    payload.history.push(payload.prevPath);
  } catch (e) {
    toast.error('Username or password is invalid.');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
