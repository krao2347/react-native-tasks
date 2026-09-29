import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        if (clickCount > 0) {
            console.log(`State updated! You clicked ${clickCount} time(s).`);
        }
    }, [clickCount]);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to React Native!</Text>

            <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setClickCount(clickCount + 1)}
            >
                <Text style={styles.buttonText}>Button Clicked: {clickCount} times</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => navigation.navigate('Second')}
            >
                <Text style={styles.buttonText}>Move to second screen</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fhsfkjf',
        padding: 20,
    },
    welcomeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 28,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 30,
    },
    counterButton: {
        backgroundColor: 'yellow',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 15,
    },
    navigateButton: {
        backgroundColor: 'blue',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'Inter_400Regular',
        color: '#ffffff',
        fontSize: 16,
    },
});