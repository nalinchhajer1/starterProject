import { StyleSheet } from 'react-native';

export const monthViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20
    }
});
