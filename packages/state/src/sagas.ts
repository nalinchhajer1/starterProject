import { all } from 'redux-saga/effects'
import { appSaga } from './sagas/AppSaga'

export default function* rootSaga() {
  yield all([
    appSaga(),
  ])
}
