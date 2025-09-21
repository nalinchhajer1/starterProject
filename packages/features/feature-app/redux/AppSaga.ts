import { all, takeLatest } from 'redux-saga/effects';
import { APP_TYPE } from './AppTypes';

function* onAppInitialize() {
    // TODO: Implement app initialization
}

export function* appSaga() {
    yield all([takeLatest(APP_TYPE.ON_APP_INITIALIZE as any, onAppInitialize)]);
}
