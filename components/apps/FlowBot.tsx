import React from 'react';
import { Zap, Play, Settings, Plus, Link as LinkIcon, Mail, Database } from 'lucide-react';

export const FlowBot: React.FC = () => {
    return (
        <div className="h-full w-full bg-slate-950 flex flex-col p-4 text-white overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Zap size={20} className="text-cyan-400 fill-cyan-400" />
                    Automação Ativa
                </h3>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Plus size={18} />
                </button>
            </div>

            <div className="relative flex-1 p-4 border border-dashed border-white/20 rounded-2xl bg-white/5 overflow-hidden">
                {/* Visual Flow Representation */}
                <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/10">
                        <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center"><Mail size={20} /></div>
                        <div>
                            <p className="text-xs font-bold">Email Chegou</p>
                            <p className="text-[10px] text-gray-400">Gatilho: Gmail</p>
                        </div>
                    </div>

                    <div className="flex justify-center h-6">
                        <div className="w-[1px] h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/10">
                        <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center"><Database size={20} /></div>
                        <div>
                            <p className="text-xs font-bold">Salvar no CRM</p>
                            <p className="text-[10px] text-gray-400">Ação: Notion</p>
                        </div>
                    </div>

                    <div className="flex justify-center h-6">
                        <div className="w-[1px] h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/10">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center"><Zap size={20} /></div>
                        <div>
                            <p className="text-xs font-bold">Notificar Equipe</p>
                            <p className="text-[10px] text-gray-400">Ação: Slack</p>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>

            <div className="mt-6 flex gap-3">
                <button className="flex-1 py-3 bg-cyan-500 text-slate-950 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                    <Play size={16} fill="currentColor" /> Rodar Agora
                </button>
                <button className="p-3 bg-white/10 rounded-xl">
                    <Settings size={18} />
                </button>
            </div>
        </div>
    );
};
