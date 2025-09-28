import { registerAppStates, views } from '../index';

test('registry function exists and is callable', () => {
    const reducerCalls: any[] = [];
    const sagaCalls: any[] = [];

    const mockInjectReducer = ((k, r, m) => reducerCalls.push([k, !!r, !!m])) as any;
    const mockInjectSaga = ((k, s) => sagaCalls.push([k, !!s])) as any;

    registerAppStates(mockInjectReducer, mockInjectSaga);

    expect(typeof registerAppStates).toBe('function');
    expect(typeof views).toBe('object');
    expect(reducerCalls.length).toBeGreaterThan(0);
    expect(sagaCalls.length).toBeGreaterThan(0);
});
