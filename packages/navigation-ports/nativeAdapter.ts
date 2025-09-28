import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';
import type { RouteParamMap, NavOps } from 'navigation-types/params';

export const createNativeNav = <M extends RouteParamMap>() => {
    const ref = createNavigationContainerRef<M>();

    const api: NavOps<M> = {
        navigate: (r, p) => ref.isReady() && ref.navigate(r as any, p as any),
        push: (r, p) => ref.isReady() && ref.dispatch(CommonActions.navigate({ name: r as any, params: p })),
        replace: (r, p) => ref.isReady() && ref.reset({ index: 0, routes: [{ name: r as any, params: p }] }),
        setParams: (_, p) => ref.isReady() && ref.dispatch(CommonActions.setParams(p as any)),
        goBack: () => ref.isReady() && ref.goBack(),
        resetTo: (r, p) => ref.isReady() && ref.reset({ index: 0, routes: [{ name: r as any, params: p }] }),
        openURL: (u) => ref.isReady() && ref.emit({ type: 'url', data: { url: u } })
    };

    return { navigationRef: ref, Nav: api };
};
