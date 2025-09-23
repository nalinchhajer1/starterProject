// Firebase messaging will go here
// Export your messaging functions when you migrate your code

import FirebaseMessaging from '@react-native-firebase/messaging';

export const requestPermission = async () => {
    await FirebaseMessaging().requestPermission();
};

export const getToken = async () => {
    return await FirebaseMessaging().getToken();
};
