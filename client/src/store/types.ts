export interface User {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    token?: string;
}

export interface Request {
    id: number;
    title: string;
    description: string;
    category: string;
    budgetRange?: string;
    customBudgetMin?: number;
    customBudgetMax?: number;
    urgency: string;
    images?: string[];
    buyerId: number;
    buyer?: { name: string; email: string; rating?: number };
    offers?: Offer[];
    createdAt: string;
    updatedAt: string;
}

export interface Offer {
    id: number;
    requestId: number;
    sellerId: number;
    price: number;
    message: string;
    deliveryDays?: number;
    seller?: { name: string; email: string; rating?: number };
    request?: Request;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRequestData {
    title: string;
    description: string;
    category: string;
    budgetRange?: string;
    customBudgetMin?: number;
    customBudgetMax?: number;
    urgency: string;
    images?: string[];
}

export interface CreateOfferData {
    requestId: number;
    price: number;
    message: string;
    deliveryDays?: number;
}
