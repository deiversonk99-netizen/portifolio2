import React, { useState } from 'react';
import { X, Star, Upload, Check } from 'lucide-react';
import { Testimonial } from '../types';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (testimonial: Testimonial) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        content: '',
        rating: 5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const testimonialData = {
                ...formData,
                image: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 100)}`
            };

            await onSubmit(testimonialData as any);
            setIsSubmitting(false);
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                setFormData({ name: '', role: '', company: '', content: '', rating: 5 });
            }, 2000);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            setIsSubmitting(false);
            alert("Erro ao enviar feedback. Tente novamente.");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {isSuccess ? (
                    <div className="p-12 text-center bg-blue-600 text-white fill-current">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Obrigado pelo seu feedback!</h3>
                        <p className="text-blue-100">Sua opinião é fundamental para nossa evolução.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Conta sua experiência</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nome</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Seu nome"
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Empresa</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="Nome da empresa"
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Cargo</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="Ex: Diretor Comercial"
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Comentário</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Como o Developer app ajudou seu negócio?"
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                ></textarea>
                            </div>

                            <div className="flex flex-col items-center py-2 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Sua Nota</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className={`transition-all transform hover:scale-125 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                        >
                                            <Star size={24} fill={star <= formData.rating ? 'currentColor' : 'none'} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                disabled={isSubmitting}
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-500/20"
                            >
                                {isSubmitting ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Enviar Feedback'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
