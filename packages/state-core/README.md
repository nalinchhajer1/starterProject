# State Core

This package manages the centralized Redux store, persistence configuration, and state management for the entire application.

## Persistence Configuration

The persistence system is centralized in `src/persistConfiguration.ts`. This file serves as the "bible" for what persists and what doesn't.

### Adding New Feature Persistence

To add persistence for a new feature, update `slicePersistConfigs` in `src/persistConfiguration.ts`:

```typescript
export const slicePersistConfigs: Record<string, PersistConfig<any>> = {
    appState: {
        key: 'appState',
        storage,
        version: 1,
        whitelist: ['language', 'numberOfTimeAppOpened']
    },
    // Add your feature here
    userState: {
        key: 'userState',
        storage,
        version: 1,
        whitelist: ['profile', 'preferences']
    }
};
```

### Persistence Options

#### Full State Persistence
```typescript
featureState: {
    key: 'featureState',
    storage,
    version: 1
    // No whitelist/blacklist = persist entire state
}
```

#### Selective Field Persistence
```typescript
featureState: {
    key: 'featureState',
    storage,
    version: 1,
    whitelist: ['field1', 'field2'] // Only persist these fields
}
```

#### Exclude Specific Fields
```typescript
featureState: {
    key: 'featureState',
    storage,
    version: 1,
    blacklist: ['temporaryData'] // Persist everything except these
}
```

### Version Management

When updating state structure, increment the version:

```typescript
featureState: {
    key: 'featureState',
    storage,
    version: 2, // Increment when state structure changes
    whitelist: ['field1', 'field2', 'newField']
}
```

### Migration

For complex state changes, add migration logic in `src/migrations.ts`:

```typescript
export const migrations = {
    1: (state: any) => {
        // Migration from version 0 to 1
        return {
            ...state,
            newField: 'defaultValue'
        };
    },
    2: (state: any) => {
        // Migration from version 1 to 2
        return {
            ...state,
            restructuredField: state.oldField
        };
    }
};
```

## Store Configuration

The store is configured in `src/store.ts` with:

- **Batch Registration**: All features are registered before store creation
- **Automatic Persistence**: Persistence is determined by the key in `persistConfiguration.ts`
- **Saga Integration**: Sagas are registered and started automatically
- **Type Safety**: Full TypeScript support

## Architecture Benefits

1. **Centralized Management**: All persistence rules in one place
2. **Type Safety**: String-based keys with no type dependencies
3. **Automatic Setup**: Features just need to register - persistence is handled automatically
4. **Version Control**: Easy to manage state migrations
5. **Performance**: Batch registration prevents unnecessary rebuilds

## Usage in Features

Features don't need to worry about persistence configuration. They just register with a key:

```typescript
// In feature register.ts
export function registerFeature(
    injectReducer: (key: string, reducer: any) => void,
    injectSaga: (key: string, saga: any) => void
) {
    // Persistence is automatically determined by the key
    injectReducer('featureState', featureReducer);
    injectSaga('featureSaga', featureSaga());
}
```

The persistence configuration is automatically applied based on the key (`featureState` in this case).

## Best Practices

1. **Use Descriptive Keys**: Make state keys clear and consistent
2. **Version Increments**: Always increment version when changing state structure
3. **Whitelist Strategy**: Prefer whitelist over blacklist for better control
4. **Migration Testing**: Test migrations thoroughly before deployment
5. **Documentation**: Document any complex state changes

## Troubleshooting

### Persistence Not Working
- Check that the feature key exists in `slicePersistConfigs`
- Verify the version number matches
- Check browser's Application tab for stored data

### State Loss
- Ensure version numbers are correct
- Check migration logic for data transformation
- Verify whitelist includes all necessary fields

### Performance Issues
- Use whitelist to persist only necessary data
- Avoid persisting large objects or arrays
- Consider using blacklist for temporary data
