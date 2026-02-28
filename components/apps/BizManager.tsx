import React from 'react';
import { Users, DollarSign, Activity, MoreHorizontal } from 'lucide-react';

export const BizManager: React.FC = () => (
  <div className="h-full w-full bg-slate-50 overflow-y-auto custom-scrollbar flex flex-col">
    <div className="bg-blue-600 p-6 pb-12 rounded-b-[2rem]">
      <div className="flex justify-between items-center text-white mb-6">
        <div>
          <p className="text-blue-200 text-sm">Bem-vindo,</p>
          <h1 className="font-bold text-xl">Gestor Silva</h1>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Activity size={20} />
        </div>
      </div>
    </div>

    <div className="px-6 -mt-8 grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-2xl shadow-lg shadow-blue-900/5">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3"><Users size={18} /></div>
        <p className="text-xs text-gray-500">Novos Clientes</p>
        <h3 className="text-xl font-bold text-gray-800">+128</h3>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-lg shadow-blue-900/5">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3"><DollarSign size={18} /></div>
        <p className="text-xs text-gray-500">Receita Hoje</p>
        <h3 className="text-xl font-bold text-gray-800">R$ 4.2k</h3>
      </div>
    </div>

    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Vendas Recentes</h3>
        <MoreHorizontal className="text-gray-400" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border-b border-gray-50 last:border-0 flex justify-between items-center hover:bg-blue-50 transition-colors cursor-pointer">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://picsum.photos/50/50?random=${i+50}`} alt="user" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Pedido #{1000+i}</p>
                <p className="text-xs text-gray-400">Há {i*10} min</p>
              </div>
            </div>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Pago</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);