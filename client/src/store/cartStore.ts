import { create } from 'zustand';

interface Product {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            set({
                cart: cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            });
        } else {
            set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
    },
    removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
    },
    updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
            get().removeFromCart(productId);
        } else {
            set({
                cart: get().cart.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                ),
            });
        }
    },
    clearCart: () => set({ cart: [] }),
    total: () => {
        return get().cart.reduce(
            (acc, item) => acc + parseFloat(item.price) * item.quantity,
            0
        );
    },
}));
