import React from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';

export const BookEasy: React.FC = () => {
    return (
        <div className="h-full w-full bg-white dark:bg-gray-900 flex flex-col p-4 overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Minha Agenda</h3>
                    <p className="text-xs text-gray-500">Sexta, 27 de Fevereiro</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                    <Calendar size={20} />
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { time: '09:00', client: 'João Silva', service: 'Consultoria TI', status: 'Confirmado' },
                    { time: '10:30', client: 'Maria Oliveira', service: 'Design UX', status: 'Em espera' },
                    { time: '14:00', client: 'Carlos Santos', service: 'Manutenção', status: 'Confirmado' },
                    { time: '16:00', client: 'Ana Costa', service: 'Reunião Inicial', status: 'Confirmado' },
                ].map((item, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between group hover:border-purple-300 dark:hover:border-purple-500 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="text-center min-w-[50px]">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.time}</p>
                                <p className="text-[10px] text-gray-500 uppercase">Hoje</p>
                            </div>
                            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.client}</p>
                                <p className="text-xs text-gray-500">{item.service}</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                ))}
            </div>

            <button className="mt-6 w-full py-4 bg-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
                Nova Reserva
            </button>
        </div>
    );
};
