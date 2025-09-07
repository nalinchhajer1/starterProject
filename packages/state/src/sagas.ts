import { all } from 'redux-saga/effects';
import { appSaga } from '../../features/feature-app/redux/AppSaga';

export default function* rootSaga() {
    yield all([appSaga()]);
}
