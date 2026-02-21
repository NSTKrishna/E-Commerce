'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

export default function Home() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading products</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product: Product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/products/${product.id}`}>
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder for image if no URL */}
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h2>
                <p className="text-indigo-600 font-bold">${parseFloat(product.price).toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
