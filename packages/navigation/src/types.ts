import { NAVIGATION_VIEW_ID } from './constants';

// Navigation types for your app
export type RootStackParamList = {
    Tab: undefined;
    [NAVIGATION_VIEW_ID.THREE_VIEW]: undefined;
    [NAVIGATION_VIEW_ID.SETTINGS]: undefined;
};

export type TabParamList = {
    [NAVIGATION_VIEW_ID.PAGE_ONE_VIEW]: undefined;
    [NAVIGATION_VIEW_ID.PAGE_TWO_VIEW]: undefined;
    [NAVIGATION_VIEW_ID.OTHER_VIEW]: undefined;
};
