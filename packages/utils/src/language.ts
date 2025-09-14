import React from 'react';
import LocalizedStrings from 'react-localization';
import { IStrings } from './resource/language/Strings';

// Re-export types for use in other parts of the application
export type { IStrings };

// Language constants
export const DEFAULT_LANGUAGE = 'en';

// Language Context
export const LanguageContext = React.createContext<string>(DEFAULT_LANGUAGE);

// React-localization setup
const Strings = new LocalizedStrings<IStrings>({
    en: require('./resource/language/en.json'),
    ...require('./resource/language/en.json')
});

export default Strings;

// Language Change Manager Component
export const LanguageChangeManager = React.memo<{ language: string }>(({ language }) => {
    Strings.setLanguage(language ?? DEFAULT_LANGUAGE);
    console.log('setting language to', language);
    return null;
});

LanguageChangeManager.displayName = 'LanguageChangeManager';
