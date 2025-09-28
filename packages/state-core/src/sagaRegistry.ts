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

export const sagaRegistry = {
    register(key: string, saga: Saga) {
        if (!sagaEntries[key]) {
            sagaEntries[key] = { key, saga };
        }
    },
    getRootSaga() {
        return buildRootSaga();
    },
    unregister(key: string) {
        delete sagaEntries[key];
    }
};
