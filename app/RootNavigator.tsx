import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { authStorage } from '../utils/authStorage';
import { authService } from '../services/api/auth';
import {
    setSessionRestoring,
    loaded,
} from '../reducers';
import {
    selectIsSessionRestoring,
    selectIsAuthenticated,
    selectIsOnboardingCompleted,
} from '../reducers/selectors';

export default function RootNavigator() {
    const dispatch = useDispatch();
    const router = useRouter();
    const isSessionRestoring = useSelector(selectIsSessionRestoring);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isOnboardingCompleted = useSelector(selectIsOnboardingCompleted);

    // Session restoration on app launch
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const token = await authStorage.getToken();

                if (!token) {
                    // No token, not authenticated
                    dispatch(setSessionRestoring(false));
                    return;
                }

                // Token exists, fetch user profile to restore session
                try {
                    const userProfile = await authService.getProfile();

                    const onboarding = userProfile?.onboarding || {
                        completed: userProfile?.isOnboardingCompleted || false,
                        step: userProfile?.onboardingStep || 1,
                    };

                    dispatch(
                        loaded({
                            user: userProfile,
                            access: token,
                            onboarding,
                        })
                    );

                    // Navigate to correct screen based on onboarding status
                    if (onboarding.completed) {
                        router.replace('/(tabs)');
                    } else {
                        // Navigate to the specific onboarding step
                        const step = onboarding.step || 1;
                        if (step === 2) router.replace('/(onboarding)/step2');
                        else if (step === 3) router.replace('/(onboarding)/step3');
                        else if (step === 4) router.replace('/(onboarding)/step4');
                        else if (step === 5) router.replace('/(onboarding)/step5');
                        else router.replace('/(onboarding)/step1');
                    }
                } catch (profileError) {
                    // Token exists but can't fetch profile (maybe token expired)
                    // Clear token and let user login again
                    await authStorage.deleteToken();
                    dispatch(setSessionRestoring(false));
                    console.error('Failed to restore profile:', profileError);
                }
            } catch (error) {
                console.error('Session restoration error:', error);
                dispatch(setSessionRestoring(false));
            }
        };

        restoreSession();
    }, [dispatch, router]);

    // Show loading screen while restoring session
    if (isSessionRestoring) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    // Render the stack navigation
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'white' },
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(auth)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="(onboarding)"
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'fade',
                }}
            />
            <Stack.Screen
                name="medications/add"
                options={{
                    headerShown: false,
                    title: '',
                }}
            />
            <Stack.Screen
                name="medications/edit"
                options={{
                    headerShown: false,
                    title: '',
                }}
            />
            <Stack.Screen
                name="refills"
                options={{
                    headerShown: false,
                    title: '',
                }}
            />
            <Stack.Screen
                name="caregiver/activity"
                options={{
                    headerShown: false,
                    title: '',
                }}
            />
            <Stack.Screen
                name="history"
                options={{
                    headerShown: false,
                    title: '',
                }}
            />
            <Stack.Screen
                name="settings/index"
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom',
                }}
            />
        </Stack>
    );
}
