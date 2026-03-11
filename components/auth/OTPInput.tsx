import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function OTPInput({ length = 6, value, onChange, error }: OTPInputProps) {
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Pad the value with empty strings up to length for rendering
    const codeDigitsArray = new Array(length).fill(0).map((_, i) => value[i] || "");

    const handlePress = () => {
        inputRef.current?.focus();
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.inputsContainer} onPress={handlePress}>
                {codeDigitsArray.map((digit, index) => {
                    const isActive = isFocused && index === value.length;
                    const isFilled = digit !== "";

                    return (
                        <View
                            key={index}
                            style={[
                                styles.digitContainer,
                                isFilled && styles.digitContainerFilled,
                                isActive && styles.digitContainerActive,
                                error ? styles.digitContainerError : null
                            ]}
                        >
                            <Text style={styles.digitText}>{digit}</Text>
                        </View>
                    );
                })}
            </Pressable>

            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={(text) => {
                    if (text.length <= length) {
                        onChange(text.replace(/[^0-9]/g, ''));
                    }
                }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                maxLength={length}
                style={styles.hiddenInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    digitContainer: {
        width: 48,
        height: 56,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    digitContainerFilled: {
        borderColor: '#bdbdbd',
        backgroundColor: '#ffffff',
    },
    digitContainerActive: {
        borderColor: '#4CAF50',
        backgroundColor: '#ffffff',
        borderWidth: 2,
    },
    digitContainerError: {
        borderColor: '#f44336',
    },
    digitText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
    errorText: {
        color: '#f44336',
        fontSize: 12,
        marginTop: 8,
        width: '100%',
        textAlign: 'center',
    },
});
