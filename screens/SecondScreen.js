import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function SecondScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.confirmationText}>
                🎉 You successfully navigated to the Second Screen!
            </Text>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3d0606',
        padding: 20,
    },
    confirmationText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#c5e0cb',
        textAlign: 'center',
        marginBottom: 25,
    },
    backButton: {
        backgroundColor: '#9e8083',
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'Inter_400Regular',
        color: '#ffffff',
        fontSize: 16,
    },
});