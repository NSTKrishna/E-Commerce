import { create } from 'zustand';
import { Request, CreateRequestData } from './types';
import { requestAPI } from './api';

interface RequestState {
    requests: Request[];
    myRequests: Request[];
    currentRequest: Request | null;
    isLoading: boolean;
    error: string | null;
    fetchRequests: () => Promise<void>;
    fetchMyRequests: () => Promise<void>;
    fetchRequestById: (id: number | string) => Promise<void>;
    createRequest: (data: CreateRequestData) => Promise<Request>;
}

export const useRequestStore = create<RequestState>((set) => ({
    requests: [],
    myRequests: [],
    currentRequest: null,
    isLoading: false,
    error: null,
    
    fetchRequests: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await requestAPI.getAll();
            set({ requests: data, isLoading: false });
        } catch (err: any) {
            set({ error: err.response?.data?.message || err.message, isLoading: false });
        }
    },
    
    fetchMyRequests: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await requestAPI.getMyRequests();
            set({ myRequests: data, isLoading: false });
        } catch (err: any) {
            set({ error: err.response?.data?.message || err.message, isLoading: false });
        }
    },
    
    fetchRequestById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const data = await requestAPI.getById(id);
            set({ currentRequest: data, isLoading: false });
        } catch (err: any) {
            set({ error: err.response?.data?.message || err.message, isLoading: false });
        }
    },
    
    createRequest: async (requestData) => {
        set({ isLoading: true, error: null });
        try {
            const data = await requestAPI.create(requestData);
            set((state) => ({ 
                myRequests: [...state.myRequests, data],
                isLoading: false 
            }));
            return data;
        } catch (err: any) {
            set({ error: err.response?.data?.message || err.message, isLoading: false });
            throw err;
        }
    }
}));
