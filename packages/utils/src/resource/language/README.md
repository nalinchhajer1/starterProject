# TypeScript Localization Strings

This directory contains TypeScript-based localization strings that provide type safety and better developer experience.

## Files

- `Strings.ts` - Contains the TypeScript interface and language configuration
- `en.json` - English language strings (JSON format)
- `README.md` - This documentation file

## File Structure

```
language/
├── Strings.ts          # TypeScript interface and configuration
├── en.json            # English translations
├── fr.json            # French translations (when added)
├── es.json            # Spanish translations (when added)
└── README.md          # Documentation
```

## Usage

### Basic Usage

```typescript
import Strings from '../language';

// Type-safe string access
const appName = Strings.APP_FULL_NAME; // TypeScript knows this is a string
const oneText = Strings.ONE; // TypeScript knows this is a string
```

### Adding New Strings

1. Add the new string key to the `IStrings` interface in `Strings.ts`
2. Add the corresponding translations to each language JSON file (e.g., `en.json`)
3. TypeScript will ensure all languages have the new string

### Adding New Languages

1. Create a new JSON file for the language (e.g., `fr.json`, `es.json`)
2. Add all string keys with their translations to the new JSON file
3. Update the `languageStrings` object in `Strings.ts` to include the new language
4. The `LanguageKey` type will automatically include the new language

#### Example: Adding French Language

1. Create `fr.json`:
```json
{
    "APP_FULL_NAME": "Projet de Démarrage",
    "ONE": "UN",
    "TWO": "DEUX",
    "SETTINGS": "PARAMÈTRES",
    "THREE": "TROIS"
}
```

2. Update `Strings.ts` to include the new language:
```typescript
export const languageStrings = {
    en: require('./en.json'),
    fr: require('./fr.json')
} as const;
```

### Example Component Usage

```typescript
import React from 'react';
import Strings from '../language';
import { LanguageKey } from '../language';

interface Props {
  currentLanguage: LanguageKey;
}

const MyComponent: React.FC<Props> = ({ currentLanguage }) => {
  return (
    <div>
      <h1>{Strings.APP_FULL_NAME}</h1>
      <p>{Strings.ONE}</p>
    </div>
  );
};
```

## Benefits

- **Type Safety**: TypeScript will catch missing string keys at compile time
- **IntelliSense**: Auto-completion for all available string keys
- **Refactoring**: Safe renaming of string keys across the entire codebase
- **Documentation**: The interface serves as documentation for all available strings
