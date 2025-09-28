import type { Router } from 'next/router';
import type { RouteParamMap, NavOps } from 'navigation-types/src/params';

export type CreateHref<M extends RouteParamMap> = <K extends keyof M & string>(r: K, p?: M[K]) => string;

export const makeWebNav = <M extends RouteParamMap>(router: Router, createHref: CreateHref<M>): NavOps<M> => ({
    navigate: (r, p) => router.push(createHref(r, p)),
    push: (r, p) => router.push(createHref(r, p)),
    replace: (r, p) => router.replace(createHref(r, p)),
    setParams: (r, p) => router.replace(createHref(r, p), undefined, { shallow: true }),
    goBack: () => router.back(),
    resetTo: (r, p) => router.replace(createHref(r, p)),
    openURL: (u) => router.push(u)
});
