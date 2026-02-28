import React from 'react';
import { Box, AlertTriangle, TrendingDown, ArrowUpRight, Search } from 'lucide-react';

export const StockWatch: React.FC = () => {
    return (
        <div className="h-full w-full bg-white dark:bg-gray-900 flex flex-col p-4 overflow-y-auto no-scrollbar">
            <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Buscar produto..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none text-sm outline-none focus:ring-2 focus:ring-red-500/20" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/20">
                    <p className="text-[10px] text-red-600 font-bold uppercase mb-1">Alertas</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-400">03</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                    <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Entradas</p>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">+12</p>
                </div>
            </div>

            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Estoque Crítico</h4>
            <div className="space-y-3">
                {[
                    { name: 'Papel A4 Premium', stock: '12 un', target: '50 un', color: 'text-red-500' },
                    { name: 'Caneta Azul Bic', stock: '05 un', target: '100 un', color: 'text-red-500' },
                    { name: 'Cabo HDMI 2.0', stock: '02 un', target: '10 un', color: 'text-orange-500' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                                <Box size={16} className="text-gray-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                        </div>
                        <div className="text-right">
                            <p className={`text-xs font-bold ${item.color}`}>{item.stock}</p>
                            <p className="text-[10px] text-gray-400">Meta: {item.target}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-auto py-3 text-red-500 font-bold text-sm hover:underline">Ver relatório completo</button>
        </div>
    );
};
