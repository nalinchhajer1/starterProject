// App defines a concrete ParamMap elsewhere and re-exports it.
// Here we provide generic contracts.

export interface RouteParamMap {
    // e.g. "SomeRoute": { /*params*/ } added by your app/types file
    // leave empty in scaffold
    [route: string]: unknown;
}

export type RouteKey<M extends RouteParamMap> = Extract<keyof M, string>;

export interface NavOps<M extends RouteParamMap> {
    navigate<K extends RouteKey<M>>(r: K, p?: M[K]): void;
    push<K extends RouteKey<M>>(r: K, p?: M[K]): void;
    replace<K extends RouteKey<M>>(r: K, p?: M[K]): void;
    setParams<K extends RouteKey<M>>(r: K, p: Partial<M[K]>): void;
    goBack(): void;
    resetTo<K extends RouteKey<M>>(r: K, p?: M[K]): void;
    openURL(url: string): void;
}
