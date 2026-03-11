import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({
    title,
    isLoading = false,
    variant = 'primary',
    style,
    disabled,
    ...props
}: ButtonProps) {

    const getContainerStyle = () => {
        switch (variant) {
            case 'secondary':
                return styles.secondaryContainer;
            case 'outline':
                return styles.outlineContainer;
            case 'primary':
            default:
                return styles.primaryContainer;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'secondary':
                return styles.secondaryText;
            case 'outline':
                return styles.outlineText;
            case 'primary':
            default:
                return styles.primaryText;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.baseContainer,
                getContainerStyle(),
                (disabled || isLoading) && styles.disabledContainer,
                style,
            ]}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? '#4CAF50' : '#ffffff'}
                    size="small"
                />
            ) : (
                <Text style={[styles.baseText, getTextStyle()]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    baseContainer: {
        width: '100%',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16,
    },
    primaryContainer: {
        backgroundColor: '#4CAF50',
    },
    secondaryContainer: {
        backgroundColor: '#e8f5e9',
    },
    outlineContainer: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    disabledContainer: {
        opacity: 0.6,
    },
    baseText: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: '#ffffff',
    },
    secondaryText: {
        color: '#2E7D32',
    },
    outlineText: {
        color: '#4CAF50',
    },
});
