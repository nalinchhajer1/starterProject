import React from 'react';
import LocalizedStrings from 'react-localization';

// Language constants
export const DEFAULT_LANGUAGE = 'en';

// Language Context
export const LanguageContext = React.createContext<string>(DEFAULT_LANGUAGE);

// React-localization setup
const Strings = new LocalizedStrings({
    en: require('./resource/language/en.json'),
    hn: require('./resource/language/hn.json'),
    ...require('./resource/language/en.json')
}) as LocalizedStrings & Record<string, string>;

export default Strings;

// Language Change Manager Component
export const LanguageChangeManager = React.memo<{ language: string }>(({ language }) => {
    Strings.setLanguage(language ?? DEFAULT_LANGUAGE);
    console.log('setting language to', language);
    return null;
});

LanguageChangeManager.displayName = 'LanguageChangeManager';
