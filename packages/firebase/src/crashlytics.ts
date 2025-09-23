// Firebase crashlytics will go here
// Export your crashlytics functions when you migrate your code

import FirebaseCrashlytics from '@react-native-firebase/crashlytics';

export const log = (message: string) => {
    FirebaseCrashlytics().log(message);
};

export const recordError = (error: Error) => {
    FirebaseCrashlytics().recordError(error);
};
