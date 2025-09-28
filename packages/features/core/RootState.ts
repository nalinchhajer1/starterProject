import { AppState } from '../feature-app/redux/AppSlices';

// Core slices (optional)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CoreSlices {}

// Features augment this interface via declaration merging.
export interface FeatureSlices {
    appState: AppState;
}

// Root state = merge of core + features
export type RootState = Readonly<CoreSlices & FeatureSlices>;
