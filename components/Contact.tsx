import React, { useState } from 'react';
import { Send, Check, Shield, Zap, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Contact: React.FC = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get('name') as string,
                contact: formData.get('contact') as string,
                message: formData.get('message') as string,
                interest: formData.get('interest') as string,
            };

            const { error } = await supabase
                .from('contact_requests')
                .insert([data]);

            if (error) throw error;
            setFormStatus('success');
        } catch (error) {
            console.error('Error saving contact request:', error);
            setFormStatus('error');
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        }
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Vamos <span className="text-gradient">construir</span> o futuro?</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Preencha o formulário e receba uma consultoria gratuita sobre a digitalização do seu negócio.</p>
                </div>

                <div className="glass-light dark:bg-gray-900/50 p-8 md:p-12 rounded-3xl shadow-2xl border border-blue-100 dark:border-gray-800 relative">
                    {formStatus === 'success' ? (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-blue-600 dark:bg-blue-700 rounded-3xl p-8 md:p-12 animate-in fade-in zoom-in duration-500">
                            <div className="text-center text-white">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
                                    <Check size={48} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-3">Mensagem Recebida!</h3>
                                <p className="text-blue-100 text-lg mb-8">Entraremos em contato com você em até 24 horas para agendar sua consultoria.</p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                                >
                                    Enviar nova mensagem
                                </button>
                            </div>
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Nome Completo</label>
                                <input name="name" required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" placeholder="Seu nome" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">WhatsApp / Email</label>
                                <input name="contact" required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" placeholder="(00) 00000-0000" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Qual seu maior desafio hoje?</label>
                            <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none" placeholder="Ex: Preciso organizar meu estoque e vendas..."></textarea>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Interesse principal:</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {['App Personalizado', 'Automação', 'Consultoria'].map((opt) => (
                                    <label key={opt} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                                        <input type="radio" name="interest" value={opt} defaultChecked={opt === 'App Personalizado'} className="text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {formStatus === 'submitting' ? (
                                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>Solicitar Proposta <Send size={20} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Shield size={20} className="text-blue-500" />
                            <span>Dados 100% Seguros</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Zap size={20} className="text-blue-500" />
                            <span>Resposta Rápida</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <MessageCircle size={20} className="text-blue-500" />
                            <span>Sem Compromisso</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};