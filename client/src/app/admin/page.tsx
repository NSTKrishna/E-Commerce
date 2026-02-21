'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    price: string;
    stock: number;
}

interface Order {
    id: number;
    user: {
        name: string;
    };
    total: string;
    status: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'ADMIN') {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    const { data: products } = useQuery<Product[]>({
        queryKey: ['adminProducts'],
        queryFn: async () => {
            const res = await api.get('/products');
            return res.data;
        },
        enabled: isAuthenticated && user?.role === 'ADMIN',
    });

    const { data: orders } = useQuery<Order[]>({
        queryKey: ['adminOrders'],
        queryFn: async () => {
            const res = await api.get('/orders');
            return res.data;
        },
        enabled: isAuthenticated && user?.role === 'ADMIN',
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/products/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
        },
    });

    if (!isAuthenticated || user?.role !== 'ADMIN') return <p>Access Denied</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`${activeTab === 'products' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`${activeTab === 'orders' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Orders
                    </button>
                </nav>
            </div>

            {activeTab === 'products' && (
                <div>
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-semibold">Manage Products</h2>
                        <Link href="/admin/products/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                            Add Product
                        </Link>
                    </div>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {products?.map((product: Product) => (
                                <li key={product.id} className="px-4 py-4 flex items-center justify-between sm:px-6">
                                    <div className="flex items-center">
                                        <p className="text-sm font-medium text-indigo-600 truncate">{product.name}</p>
                                        <p className="ml-4 text-sm text-gray-500">${parseFloat(product.price).toFixed(2)}</p>
                                        <p className="ml-4 text-sm text-gray-500">Stock: {product.stock}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure?')) {
                                                    deleteProductMutation.mutate(product.id);
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">All Orders</h2>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {orders?.map((order: Order) => (
                                <li key={order.id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-indigo-600 truncate">Order #{order.id}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                User: {order.user.name}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>
                                                Total: ${parseFloat(order.total).toFixed(2)}
                                            </p>
                                            <p className="ml-4">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
