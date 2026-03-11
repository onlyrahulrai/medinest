import { useState, useEffect, useCallback } from 'react';
import { authStorage } from '../utils/authStorage';

// Mock API delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useAuth() {
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize session from secure storage
    useEffect(() => {
        const loadSession = async () => {
            try {
                const token = await authStorage.getToken();
                if (token) {
                    setSessionToken(token);
                }
            } catch (err) {
                console.error('Failed to load session token', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadSession();
    }, []);

    const requestOTP = useCallback(async (phoneNumber: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // MOCK API CALL
            await delay(1500);

            // Basic validation
            if (!phoneNumber || phoneNumber.length < 10) {
                throw new Error('Invalid phone number');
            }

            // In a real app, API would send OTP here
            console.log(`OTP requested for ${phoneNumber}`);
            return true;
        } catch (err: any) {
            setError(err.message || 'Failed to request OTP. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const verifyOTP = useCallback(async (phoneNumber: string, otp: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // MOCK API CALL
            await delay(1500);

            if (otp !== '123456') {
                throw new Error('Invalid OTP code. Please try again.');
            }

            // In a real app, API returns a token
            const mockToken = `mock_jwt_token_${Date.now()}`;
            await authStorage.saveToken(mockToken);
            setSessionToken(mockToken);
            return true;
        } catch (err: any) {
            setError(err.message || 'Failed to verify OTP.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await authStorage.deleteToken();
            setSessionToken(null);
        } catch (err) {
            console.error('Logout error', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        sessionToken,
        isLoading,
        error,
        requestOTP,
        verifyOTP,
        logout,
    };
}
