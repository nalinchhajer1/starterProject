import { createNativeNav } from '../nativeAdapter';

type M = { ROUTE_X: { a?: string }; ROUTE_Y: undefined };

test('native adapter no-ops when ref not ready', () => {
    const { Nav } = createNativeNav<M>();
    // Should not throw:
    Nav.navigate('ROUTE_Y');
    Nav.goBack();
});

test('native adapter exposes all methods', () => {
    const { Nav } = createNativeNav<M>();
    expect(typeof Nav.navigate).toBe('function');
    expect(typeof Nav.push).toBe('function');
    expect(typeof Nav.replace).toBe('function');
    expect(typeof Nav.setParams).toBe('function');
    expect(typeof Nav.goBack).toBe('function');
    expect(typeof Nav.resetTo).toBe('function');
    expect(typeof Nav.openURL).toBe('function');
});
