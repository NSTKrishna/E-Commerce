'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    imageUrl: string;
}

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { addToCart } = useCartStore();
    const [added, setAdded] = useState(false);

    const { data: product, isLoading, error } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await api.get(`/products/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error loading product</div>;
    if (!product) return <div className="text-center mt-10">Product not found</div>;

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto mt-10">
            <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/2">
                    {product.imageUrl ? (
                        <img className="h-full w-full object-cover" src={product.imageUrl} alt={product.name} />
                    ) : (
                        <div className="flex items-center justify-center h-64 md:h-full bg-gray-200 text-gray-500">No Image Available</div>
                    )}
                </div>
                <div className="p-8 md:w-1/2">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                    <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
                    <p className="mt-4 text-xl text-gray-500">${parseFloat(product.price).toFixed(2)}</p>
                    <p className="mt-4 text-gray-500">{product.description}</p>
                    <div className="mt-8">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${product.stock > 0
                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                                } md:py-4 md:text-lg md:px-10`}
                        >
                            {added ? 'Added to Cart!' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
