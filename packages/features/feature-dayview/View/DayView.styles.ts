import { StyleSheet } from 'react-native';

export const dayViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20
    }
});
