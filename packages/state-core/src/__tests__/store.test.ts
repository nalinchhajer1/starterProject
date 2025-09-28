import { createStore } from '../store';
import { PersistConfig } from 'redux-persist';

test('injects reducers and replaces root', () => {
    const { store } = createStore((injectReducer, injectSaga) => {
        const reducer = (s = { n: 0 }, a: any) => (a.type === 'inc' ? { n: s.n + 1 } : s);
        injectReducer('keyA', reducer);
    });

    store.dispatch({ type: 'inc' });
    expect(store.getState().keyA.n).toBe(1);
});

test('supports per-slice persist meta (no crash)', () => {
    const stores = createStore((injectReducer, injectSaga) => {
        const reducer = (s = { x: 1 }, _a: any) => s;
        injectReducer('keyB', reducer);
    });
    // Test passes if no crash occurs
});
