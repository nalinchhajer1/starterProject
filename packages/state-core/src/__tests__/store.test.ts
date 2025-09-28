import { createStore } from '../store';
import { PersistConfig } from 'redux-persist';

test('injects reducers and replaces root', () => {
    const { store, injectReducer } = createStore();

    const reducer = (s = { n: 0 }, a: any) => (a.type === 'inc' ? { n: s.n + 1 } : s);
    injectReducer('keyA', reducer);

    store.dispatch({ type: 'inc' });
    expect(store.getState().keyA.n).toBe(1);
});

test('supports per-slice persist meta (no crash)', () => {
    const { injectReducer } = createStore();
    const reducer = (s = { x: 1 }, _a: any) => s;
    const persist: PersistConfig<any> = { key: 'keyB', storage: {} as any, version: 1 };
    injectReducer('keyB', reducer, { persist });
});
