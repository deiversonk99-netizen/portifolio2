import React from 'react';
import { ShoppingBag, Search, Heart } from 'lucide-react';

export const ShopFlow: React.FC = () => (
  <div className="h-full w-full bg-amber-50 overflow-y-auto custom-scrollbar flex flex-col">
    <div className="p-6 pb-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-amber-900">ShopFlow</h1>
        <div className="relative">
          <ShoppingBag className="text-amber-900" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </div>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input type="text" placeholder="Buscar produtos..." className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl text-sm border-none shadow-sm focus:ring-2 focus:ring-amber-400 outline-none" />
      </div>
      
      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {['Todos', 'Roupas', 'Tênis', 'Acessórios'].map((cat, i) => (
          <button key={i} className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${i === 0 ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 border border-amber-100'}`}>
            {cat}
          </button>
        ))}
      </div>
    </div>

    {/* Grid */}
    <div className="p-6 pt-0 grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white p-3 rounded-2xl shadow-sm border border-amber-100 group cursor-pointer">
          <div className="relative h-32 bg-gray-100 rounded-xl mb-3 overflow-hidden">
            <img src={`https://picsum.photos/200/200?random=${item + 20}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Prod" />
            <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-gray-400 hover:text-red-500"><Heart size={14} /></button>
          </div>
          <h3 className="font-bold text-gray-800 text-sm mb-1">Produto Premium {item}</h3>
          <div className="flex justify-between items-center">
            <span className="font-bold text-amber-600">R$ {(item * 49.90).toFixed(2)}</span>
            <button className="bg-amber-100 text-amber-700 p-1.5 rounded-lg text-xs hover:bg-amber-500 hover:text-white transition-colors">+</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);