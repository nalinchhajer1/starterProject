// Firebase analytics will go here
// Export your analytics functions when you migrate your code

import FirebaseAnalytics from '@react-native-firebase/analytics';

export const trackEvent = (event: string, params: Record<string, any>) => {
    FirebaseAnalytics().logEvent(event, params);
};
