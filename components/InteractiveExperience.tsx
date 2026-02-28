import React, { useState } from 'react';
import { X, FileSpreadsheet, AlertTriangle, Clock, TrendingUp, CheckCircle, Smartphone, MessageCircle, BarChart3 } from 'lucide-react';
import { ProblemNode } from '../types';

const problems: ProblemNode[] = [
    {
        id: 'org',
        title: 'Desorganização',
        icon: <FileSpreadsheet size={24} />,
        position: { top: '15%', left: '15%' },
        solutionApp: 'BizManager',
        before: ['Planilhas perdidas', 'Dados incorretos', 'Confusão mental'],
        after: ['Dashboard centralizado', 'Dados em tempo real', 'Clareza total']
    },
    {
        id: 'time',
        title: 'Perda de Tempo',
        icon: <Clock size={24} />,
        position: { top: '20%', right: '15%' },
        solutionApp: 'FlowBot',
        before: ['Tarefas manuais', 'Retrabalho constante', 'Equipe sobrecarregada'],
        after: ['Automação inteligente', 'Foco no estratégico', 'Equipe produtiva']
    },
    {
        id: 'money',
        title: 'Risco Financeiro',
        icon: <AlertTriangle size={24} />,
        position: { bottom: '20%', left: '20%' },
        solutionApp: 'FinControl',
        before: ['Fluxo de caixa incerto', 'Contas atrasadas', 'Sem previsibilidade'],
        after: ['Controle total', 'Alertas de vencimento', 'Previsão financeira']
    },
    {
        id: 'comm',
        title: 'Falha de Comunicação',
        icon: <MessageCircle size={24} />,
        position: { bottom: '25%', right: '15%' },
        solutionApp: 'ConnectFlow',
        before: ['Mensagens perdidas', 'Informação centralizada', 'Ruídos na equipe'],
        after: ['Comunicação fluida', 'Histórico acessível', 'Time alinhado']
    },
    {
        id: 'report',
        title: 'Falta de Relatórios',
        icon: <BarChart3 size={24} />,
        position: { top: '50%', left: '5%' },
        solutionApp: 'DataView',
        before: ['Decisões no "achismo"', 'Dados manuais', 'Sem visão de futuro'],
        after: ['BI automatizado', 'Dados estratégicos', 'Crescimento previsível']
    },
];

export const InteractiveExperience: React.FC = () => {
    const [activeProblem, setActiveProblem] = useState<ProblemNode | null>(null);

    return (
        <section id="experience" className="py-24 bg-gray-900 relative overflow-hidden min-h-[800px] flex items-center">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-gray-900 to-gray-900"></div>

            {/* Neural Network Connections (SVG Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <line x1="50%" y1="50%" x2="15%" y2="15%" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                <line x1="50%" y1="50%" x2="85%" y2="75%" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                <circle cx="50%" cy="50%" r="50" fill="url(#grad1)" fillOpacity="0.2" />
                <defs>
                    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" style={{ stopColor: 'rgb(59,130,246)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(17,24,39)', stopOpacity: 0 }} />
                    </radialGradient>
                </defs>
            </svg>

            <div className="container mx-auto px-6 relative z-10 h-full">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-2">Onde dói o seu negócio?</h2>
                    <p className="text-blue-300">Clique nos problemas para ver a transformação.</p>
                </div>

                <div className="relative w-full h-[500px] md:h-[600px]">
                    {/* Center Hub */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-blue-500/30 flex items-center justify-center animate-pulse-slow">
                        <div className="w-24 h-24 rounded-full bg-blue-600/20 backdrop-blur-sm flex items-center justify-center border border-blue-400 text-white font-bold text-center p-2 text-xs">
                            Transformação<br />Digital
                        </div>
                    </div>

                    {/* Nodes */}
                    {problems.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveProblem(p)}
                            className="absolute group w-24 h-24 flex flex-col items-center justify-center gap-2 hover:scale-110 transition-transform duration-300 outline-none"
                            style={p.position}
                        >
                            <div className="w-14 h-14 rounded-full bg-gray-800 border-2 border-gray-600 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center text-gray-300 group-hover:text-red-400 transition-all">
                                {p.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-white bg-gray-900/80 px-2 py-1 rounded">{p.title}</span>
                            <div className="absolute -inset-4 border border-dashed border-gray-700 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    ))}
                </div>

                {/* Modal */}
                {activeProblem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveProblem(null)}></div>
                        <div className="relative bg-gray-900 border border-gray-700 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row">
                            <button onClick={() => setActiveProblem(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white z-20">
                                <X size={24} />
                            </button>

                            {/* Before Side */}
                            <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-800 bg-red-900/5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
                                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                                    <AlertTriangle size={20} /> ANTES
                                </h3>
                                <div className="space-y-4">
                                    {activeProblem.before.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-gray-400 animate-in slide-in-from-left" style={{ animationDelay: `${i * 100}ms` }}>
                                            <X size={16} className="text-red-500" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-center opacity-30">
                                    <FileSpreadsheet size={100} className="text-red-500 rotate-12" />
                                </div>
                            </div>

                            {/* After Side */}
                            <div className="flex-1 p-8 md:p-12 bg-blue-900/10 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                                <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                                    <CheckCircle size={20} /> DEPOIS
                                </h3>
                                <div className="space-y-4">
                                    {activeProblem.after.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-gray-200 animate-in slide-in-from-right" style={{ animationDelay: `${i * 100 + 300}ms` }}>
                                            <CheckCircle size={16} className="text-blue-500" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 bg-gray-800 rounded-xl p-4 border border-gray-700 animate-pulse">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-600 rounded-lg"><Smartphone size={20} className="text-white" /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">Solução sugerida</p>
                                            <p className="font-bold text-white">{activeProblem.solutionApp}</p>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-3/4 animate-[width_2s_ease-out]"></div>
                                    </div>
                                    <p className="text-xs text-right mt-1 text-blue-400">Eficiência +80%</p>
                                </div>
                            </div>

                            {/* Central Arrow */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-gray-700 p-2 rounded-full z-10 hidden md:block">
                                <TrendingUp className="text-white" size={24} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};