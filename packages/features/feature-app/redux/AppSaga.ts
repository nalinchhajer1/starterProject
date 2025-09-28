import { all, takeLatest, put } from 'redux-saga/effects';
import { APP_TYPE } from './AppTypes';

function* onAppInitialize() {
    // Increment the app open counter
    yield put({ type: APP_TYPE.INCREMENT_APP_OPEN_COUNTER });
}

export function* appSaga() {
    yield all([takeLatest(APP_TYPE.ON_APP_INITIALIZE as any, onAppInitialize)]);
}
