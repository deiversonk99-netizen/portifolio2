import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, CreditCard, ShoppingCart, BarChart3, Calendar, Box, Zap } from 'lucide-react';
import { AppId } from '../types';
import { FinControl } from './apps/FinControl';
import { ShopFlow } from './apps/ShopFlow';
import { BizManager } from './apps/BizManager';
import { BookEasy } from './apps/BookEasy';
import { StockWatch } from './apps/StockWatch';
import { FlowBot } from './apps/FlowBot';

export const AppShowcase: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppId>('financeiro');
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const apps = [
    { id: 'financeiro', label: 'Finanças', icon: <CreditCard size={20} />, color: 'from-emerald-400 to-emerald-600', comp: FinControl },
    { id: 'ecommerce', label: 'Loja', icon: <ShoppingCart size={20} />, color: 'from-amber-400 to-amber-600', comp: ShopFlow },
    { id: 'gestao', label: 'Gestão', icon: <BarChart3 size={20} />, color: 'from-blue-400 to-blue-600', comp: BizManager },
    { id: 'agenda', label: 'Agenda', icon: <Calendar size={20} />, color: 'from-purple-400 to-purple-600', comp: BookEasy },
    { id: 'estoque', label: 'Estoque', icon: <Box size={20} />, color: 'from-red-400 to-red-600', comp: StockWatch },
    { id: 'automacao', label: 'Automação', icon: <Zap size={20} />, color: 'from-cyan-400 to-cyan-600', comp: FlowBot },
  ];

  const handleAppChange = (id: AppId) => {
    if (id === activeApp) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveApp(id);
      setIsTransitioning(false);
    }, 300);
  };

  const ActiveComponent = apps.find(a => a.id === activeApp)?.comp || FinControl;
  const activeAppData = apps.find(a => a.id === activeApp);

  return (
    <section id="apps" className="py-24 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4 uppercase tracking-wider">Showcase Interativo</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Apps que <span className="text-gradient">transformam</span> rotinas
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Navegue pelos protótipos abaixo e sinta a experiência de ter o controle na palma da mão.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 inline-flex">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'mobile' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Smartphone size={16} /> Celular
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'desktop' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Monitor size={16} /> Desktop
            </button>
          </div>
        </div>

        {/* App Frame */}
        <div className="flex justify-center mb-12 h-[600px] perspective-[1000px]">
          <div
            className={`
              relative bg-white dark:bg-gray-900 shadow-2xl transition-all duration-500 ease-in-out border-8 border-gray-800 dark:border-gray-700 overflow-hidden
              ${viewMode === 'mobile' ? 'w-[320px] rounded-[3rem]' : 'w-[90%] md:w-[800px] rounded-xl'}
            `}
          >
            {/* Notch/Camera for Mobile */}
            {viewMode === 'mobile' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-gray-700 rounded-b-xl z-20"></div>
            )}

            {/* Content Area */}
            <div className={`w-full h-full bg-white dark:bg-gray-900 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95 rotate-y-6' : 'opacity-100 scale-100 rotate-y-0'}`}>
              <ActiveComponent />
            </div>
          </div>
        </div>

        {/* Dock Navigation */}
        <div className="flex justify-center">
          <div className="glass-light px-4 py-3 rounded-2xl shadow-xl border border-white/50 flex gap-2 sm:gap-4 overflow-x-auto max-w-full no-scrollbar">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppChange(app.id as AppId)}
                className={`group flex flex-col items-center gap-1 min-w-[64px] transition-all duration-300 ${activeApp === app.id ? '-translate-y-2' : 'hover:-translate-y-1'}`}
              >
                <div
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300
                    bg-gradient-to-br ${app.color}
                    ${activeApp === app.id ? 'scale-110 ring-4 ring-blue-100' : 'opacity-70 group-hover:opacity-100'}
                  `}
                >
                  {app.icon}
                </div>
                <span className={`text-[10px] font-medium transition-colors ${activeApp === app.id ? 'text-blue-600' : 'text-gray-400'}`}>
                  {app.label}
                </span>
                {activeApp === app.id && <div className="w-1 h-1 bg-blue-600 rounded-full"></div>}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};