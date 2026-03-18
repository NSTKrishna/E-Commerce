import { create } from 'zustand';
import { Offer, CreateOfferData } from './types';
import { offerAPI } from './api';

interface OfferState {
    myOffers: Offer[];
    requestOffers: Offer[];
    isLoading: boolean;
    error: string | null;
    fetchMyOffers: () => Promise<void>;
    fetchOffersByRequest: (requestId: number | string) => Promise<void>;
    createOffer: (data: CreateOfferData) => Promise<Offer>;
}

export const useOfferStore = create<OfferState>((set) => ({
    myOffers: [],
    requestOffers: [],
    isLoading: false,
    error: null,
    
    fetchMyOffers: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await offerAPI.getMyOffers();
            set({ myOffers: data, isLoading: false });
        } catch (err: any) {
            set({ error: err.response?.data?.message || err.message, isLoading: false });
        }
    },
    
    fetchOffersByRequest: async (requestId) => {
        set({ isLoading: true, error: null });
        try {
            const data = await offerAPI.getOffersByRequest(requestId);
            set({ requestOffers: data, isLoading: false });
        } catch (err: any) {
            set({ error: err.response?.data?.message || err.message, isLoading: false });
        }
    },
    
    createOffer: async (offerData) => {
        set({ isLoading: true, error: null });
        try {
            const data = await offerAPI.create(offerData);
            set((state) => ({ 
                myOffers: [...state.myOffers, data],
                requestOffers: [...state.requestOffers, data],
                isLoading: false 
            }));
            return data;
        } catch (err: any) {
            set({ error: err.response?.data?.message || err.message, isLoading: false });
            throw err;
        }
    }
}));
