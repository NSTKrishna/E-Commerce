import { create } from 'zustand';
import { User } from './types';
import { authAPI } from './api';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (userData: User & { token: string }) => void;
    logout: () => void;
    checkAuth: () => void;
    updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    login: (userData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData, token: userData.token, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
    },
    checkAuth: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            set({ user: JSON.parse(user), token, isAuthenticated: true });
        }
    },
    updateProfile: async (data) => {
        try {
            const updatedUser = await authAPI.updateProfile(data);
            const token = localStorage.getItem('token') || '';
            const mergedUser = { ...updatedUser, token };
            localStorage.setItem('user', JSON.stringify(mergedUser));
            set({ user: mergedUser });
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        }
    }
}));
