'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="font-bold text-xl text-indigo-600">ShopEasy</span>
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
                        <Link href="/products" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                            Products
                        </Link>
                        {user ? (
                            <>
                                <Link href="/cart" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                    <ShoppingCart className="h-5 w-5 mr-1" />
                                    Cart
                                </Link>
                                <Link href="/orders" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                    My Orders
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Link href="/admin" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <div className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/auth/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                                Login / Register
                            </Link>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/products" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                            Products
                        </Link>
                        {user ? (
                            <>
                                <Link href="/cart" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium flex items-center">
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Cart
                                </Link>
                                <Link href="/orders" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                                    My Orders
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Link href="/admin" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="block w-full text-left text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/auth/login" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
