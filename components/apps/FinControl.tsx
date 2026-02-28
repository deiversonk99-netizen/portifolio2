import React from 'react';
import { Menu, ArrowUp, ArrowDown, Plus } from 'lucide-react';

export const FinControl: React.FC = () => (
  <div className="h-full w-full bg-emerald-50 overflow-y-auto custom-scrollbar flex flex-col relative">
    <div className="bg-emerald-600 text-white p-6 rounded-b-3xl shadow-lg sticky top-0 z-10">
      <div className="flex justify-between items-center mb-6">
        <Menu className="opacity-80" />
        <h1 className="font-bold text-lg">FinControl</h1>
        <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center text-xs">JS</div>
      </div>
      <div className="text-center mb-4">
        <p className="text-emerald-100 text-sm">Saldo Total</p>
        <h2 className="text-3xl font-bold mt-1">R$ 15.750,00</h2>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 flex items-center gap-2">
          <div className="bg-emerald-400 p-1.5 rounded-full"><ArrowUp size={14} /></div>
          <div><p className="text-xs opacity-80">Receitas</p><p className="font-bold text-sm">R$ 8.5k</p></div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 flex items-center gap-2">
          <div className="bg-red-400 p-1.5 rounded-full"><ArrowDown size={14} /></div>
          <div><p className="text-xs opacity-80">Despesas</p><p className="font-bold text-sm">R$ 3.2k</p></div>
        </div>
      </div>
    </div>

    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-bold text-gray-800 mb-4">Gastos por Categoria</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {[{color:'bg-red-500', w:'35%'}, {color:'bg-blue-500', w:'25%'}, {color:'bg-yellow-500', w:'20%'}, {color:'bg-purple-500', w:'20%'}].map((item, i) => (
                <div key={i} className={`h-24 min-w-[80px] rounded-xl ${item.color} opacity-90 shadow-sm flex flex-col justify-end p-2 text-white text-xs`}>
                    <span className="font-bold">{item.w}</span>
                </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 mb-4">Transações Recentes</h3>
        <div className="space-y-3">
          {[
            { title: 'Salário Mensal', date: 'Hoje', val: '+ R$ 5.000', type: 'in' },
            { title: 'Supermercado', date: 'Ontem', val: '- R$ 450,00', type: 'out' },
            { title: 'Netflix', date: '25 Jan', val: '- R$ 55,90', type: 'out' },
          ].map((t, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 flex justify-between items-center hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex gap-3 items-center">
                <div className={`p-2 rounded-full ${t.type === 'in' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                  {t.type === 'in' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{t.title}</p>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>
              </div>
              <p className={`font-bold text-sm ${t.type === 'in' ? 'text-emerald-600' : 'text-red-500'}`}>{t.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <button className="absolute bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-600/40 flex items-center justify-center hover:scale-110 transition-transform">
      <Plus size={28} />
    </button>
  </div>
);