import { Saga } from 'redux-saga';
import { all } from 'redux-saga/effects';

type SagaEntry = { key: string; saga: Saga };
const sagaEntries: Record<string, SagaEntry> = {};

const buildRootSaga = () => {
    const sagas = Object.values(sagaEntries).map((entry) => entry.saga);

    function* rootSaga() {
        yield all(sagas);
    }

    return rootSaga;
};

let currentRootSaga = buildRootSaga();

export const sagaRegistry = {
    register(key: string, saga: Saga) {
        if (!sagaEntries[key]) {
            sagaEntries[key] = { key, saga };
            currentRootSaga = buildRootSaga();
        }
    },
    getRootSaga() {
        return currentRootSaga;
    },
    unregister(key: string) {
        delete sagaEntries[key];
        currentRootSaga = buildRootSaga();
    }
};
