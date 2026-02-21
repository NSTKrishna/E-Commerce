'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    product: {
        name: string;
        imageUrl: string;
    }
}

interface Order {
    id: number;
    total: string;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

export default function OrderHistoryPage() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            // ideally handled by middleware or HOC, but simple check here
        }
    }, [isAuthenticated, router]);

    const { data: orders, isLoading, error } = useQuery<Order[]>({
        queryKey: ['myOrders'],
        queryFn: async () => {
            const res = await api.get('/orders/myorders');
            return res.data;
        },
        enabled: isAuthenticated,
    });

    if (!isAuthenticated) return <div className="text-center mt-10">Please login to view orders</div>;
    if (isLoading) return <div className="text-center mt-10">Loading orders...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error loading orders</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Orders</h1>
            {orders?.length === 0 ? (
                <div className="text-center text-gray-500">You have no orders yet.</div>
            ) : (
                <div className="space-y-6">
                    {orders?.map((order: Order) => (
                        <div key={order.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Order #{order.id}</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-500">Total</p>
                                    <p className="text-lg font-bold text-gray-900">${parseFloat(order.total).toFixed(2)}</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-gray-200">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {order.items.map((item: OrderItem) => (
                                        <li key={item.id} className="px-4 py-4 sm:px-6 flex items-center">
                                            <div className="flex-shrink-0 h-16 w-16 border border-gray-200 rounded-md overflow-hidden bg-gray-100 text-center flex items-center justify-center text-xs text-gray-400">
                                                {item.product.imageUrl ? <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover" /> : "No Img"}
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex justify-between">
                                                    <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                                                    <p className="text-sm text-gray-500">${parseFloat(item.price).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
