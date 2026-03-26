import { authService } from '../services/api/auth';
import { userApi } from '../services/api/userApi';

/**
 * Saves onboarding profile data to backend
 * Supports partial updates - only send data for current step
 */
export async function updateOnboardingProfile(data: Record<string, any>) {
    try {
        const response = await authService.editProfile(data);
        return { success: true, data: response };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to save profile. Please try again.';
        return { success: false, error: errorMessage };
    }
}

/**
 * Validates caregiver phone and checks if user exists
 * Returns { exists: boolean, user?: Record<string, any> }
 */
export async function validateCaregiverPhone(phone: string) {
    try {
        const response = await userApi.checkUserExists(phone);
        return { success: true, data: response };
    } catch (error: any) {
        // Treat lookup failure as "not found" (don't block user)
        return { success: true, data: { exists: false } };
    }
}

/**
 * Build onboarding step update payload
 * Only includes fields relevant to the current step
 */
export function buildOnboardingPayload(
    step: number,
    data: Record<string, any>
) {
    const basePayload = {
        onboarding: {
            step,
            completed: false,
        },
    };

    switch (step) {
        case 1:
            return {
                ...basePayload,
                profile: {
                    dateOfBirth: data.dateOfBirth,
                    gender: data.gender,
                    weight: data.weight,
                },
                name: data.name,
                languages: data.languages || [],
            };

        case 2:
            return {
                ...basePayload,
                profile: {
                    conditions: data.conditions || [],
                },
            };

        case 3:
            return {
                ...basePayload,
                caregivers: data.caregivers || [],
            };

        case 4:
            return {
                ...basePayload,
                preferences: {
                    soundEnabled: data.soundEnabled ?? true,
                    vibrationEnabled: data.vibrationEnabled ?? true,
                    shareActivityWithCaregiver: data.shareActivityWithCaregiver ?? true,
                },
                routines: data.routines || [],
            };

        case 5:
            // Final step - mark as completed
            return {
                onboarding: {
                    step: 5,
                    completed: true,
                },
                preferences: {
                    soundEnabled: data.soundEnabled ?? true,
                    vibrationEnabled: data.vibrationEnabled ?? true,
                    shareActivityWithCaregiver: data.shareActivityWithCaregiver ?? true,
                },
            };

        default:
            return basePayload;
    }
}
