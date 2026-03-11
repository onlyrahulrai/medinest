import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TextInputProps } from 'react-native';

interface PhoneInputProps extends TextInputProps {
    countryCode?: string;
    error?: string;
}

export function PhoneInput({ countryCode = '+91', error, style, ...props }: PhoneInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused,
                    error ? styles.inputContainerError : null
                ]}
            >
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCodeText}>{countryCode}</Text>
                </View>
                <TextInput
                    style={[styles.input, style]}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    autoComplete="tel"
                    importantForAutofill="yes"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor="#9e9e9e"
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        height: 56,
    },
    inputContainerFocused: {
        borderColor: '#4CAF50',
        backgroundColor: '#ffffff',
    },
    inputContainerError: {
        borderColor: '#f44336',
    },
    countryCodeContainer: {
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
    },
    countryCodeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 16,
    },
    errorText: {
        color: '#f44336',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
    },
});
