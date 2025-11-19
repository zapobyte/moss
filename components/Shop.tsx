import React, { useState } from 'react';
import { Product } from '../types';
import { ASSETS } from '../constants';
import { Button } from './Button';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Flat Moss Panel",
    price: 129.00,
    image: ASSETS.PLACEHOLDER_PRODUCT_1,
    description: "Standard flat moss panel."
  },
  {
    id: 2,
    name: "Bun Moss Art",
    price: 249.00,
    image: ASSETS.PLACEHOLDER_PRODUCT_2,
    description: "High-relief bun moss 3D landscape."
  },
];

export const Shop: React.FC = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="w-full bg-white min-h-screen pt-32">
      {/* Minimal Header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-mos-dark tracking-tighter mb-2">Collection</h1>
            <p className="text-gray-400 text-sm uppercase tracking-widest">Spring / Summer 2024</p>
          </div>
          
          {/* Filters */}
          <div className="flex gap-8 mt-8 md:mt-0">
            {['all', 'panels', 'frames'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors
                  ${filter === cat 
                    ? 'text-mos-dark' 
                    : 'text-gray-300 hover:text-mos-primary'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-24">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center">
                   <Button size="sm" className="bg-white text-mos-dark border-none hover:bg-mos-dark hover:text-white shadow-lg w-full">Add to Cart</Button>
                </div>
              </div>
              
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium text-mos-dark group-hover:text-mos-primary transition-colors">
                  {product.name}
                </h3>
                <span className="text-sm font-bold text-gray-500">
                  €{product.price}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1 font-light">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};