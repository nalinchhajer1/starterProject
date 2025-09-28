import { LocalizedStringsMethods } from 'react-localization';

// Define the interface for all string keys (without extending LocalizedStringsMethods)
export interface IStrings extends LocalizedStringsMethods {
    APP_FULL_NAME: string;
    ONE: string;
    TWO: string;
    SETTINGS: string;
    THREE: string;
    OTHER: string;
    APP_OPENED_COUNTER: string;
}
