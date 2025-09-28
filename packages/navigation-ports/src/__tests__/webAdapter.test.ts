import { makeWebNav } from '../webAdapter';

type M = { ROUTE_X: { a?: string }; ROUTE_Y: undefined };

test('web adapter calls router with build hrefs', async () => {
    const calls: any[] = [];
    const router = {
        push: (u: string) => {
            calls.push(['push', u]);
            return Promise.resolve(true);
        },
        replace: (u: string) => {
            calls.push(['replace', u]);
            return Promise.resolve(true);
        },
        back: () => {
            calls.push(['back']);
        }
    } as any;

    const createHref = (r: keyof M, p?: any) => (r === 'ROUTE_X' ? `/x${p?.a ? `?a=${encodeURIComponent(p.a)}` : ''}` : '/y');

    const nav = makeWebNav<M>(router, createHref);

    await nav.navigate('ROUTE_X', { a: '1' });
    await nav.replace('ROUTE_Y');
    nav.goBack();

    expect(calls).toEqual([['push', '/x?a=1'], ['replace', '/y'], ['back']]);
});
