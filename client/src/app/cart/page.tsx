'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useState } from 'react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, total, clearCart } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            router.push('/auth/login?redirect=/cart');
            return;
        }

        setIsCheckingOut(true);
        try {
            const orderItems = cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: parseFloat(item.price),
            }));

            await api.post('/orders', {
                orderItems,
                totalPrice: total(),
            });

            clearCart();
            router.push('/orders');
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h1>
            <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.map((item) => (
                        <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-center object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">No Image</div>
                                )}
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <Link href={`/products/${item.id}`}>{item.name}</Link>
                                        </h3>
                                        <p className="ml-4">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center">
                                        <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-500">Qty</label>
                                        <select
                                            id={`quantity-${item.id}`}
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {[...Array(10).keys()].map((i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex">
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total().toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${isCheckingOut ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {isCheckingOut ? 'Processing...' : 'Checkout'}
                    </button>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                        or{' '}
                        <Link href="/" className="text-indigo-600 font-medium hover:text-indigo-500">
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
