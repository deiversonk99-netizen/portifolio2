import React, { useState, useEffect } from 'react';
import { Star, Quote, Plus } from 'lucide-react';
import { Testimonial } from '../types';
import { FeedbackModal } from './FeedbackModal';
import { supabase } from '../lib/supabase';

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    role: "CEO",
    company: "Doces da Maria",
    content: "Antes eu perdia horas organizando pedidos em planilhas. Agora, com o app, tudo fica registrado automaticamente. Ganhei tempo e sanidade mental.",
    image: "https://picsum.photos/100/100?random=10",
    rating: 5
  },
  {
    id: 2,
    name: "João Santos",
    role: "Diretor",
    company: "AutoPeças JR",
    content: "Digitalizamos todo o processo de atendimento. O resultado? 40% mais eficiência e clientes muito mais satisfeitos. Melhor investimento que fizemos.",
    image: "https://picsum.photos/100/100?random=11",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Gestora",
    company: "Clínica Vida",
    content: "Precisávamos de algo sob medida para o nosso fluxo. O app foi desenvolvido exatamente como precisávamos. Solução personalizada que realmente funciona.",
    image: "https://picsum.photos/100/100?random=12",
    rating: 5
  }
];

interface TestimonialsProps {
  allowFeedback?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ allowFeedback = false }) => {
  const [list, setList] = useState<Testimonial[]>(defaultTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setList([...defaultTestimonials, ...data]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleAddFeedback = async (feedback: Omit<Testimonial, 'id'>) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([feedback]);

      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error('Error saving feedback:', error);
      alert('Erro ao salvar feedback. Por favor, tente novamente.');
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resultados que <span className="text-gradient">falam por si</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Histórias reais de empreendedores que transformaram seus negócios através da digitalização.
          </p>

          {allowFeedback && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all transform hover:scale-105 mb-8"
            >
              <Plus size={20} />
              Deixar meu Feedback
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {list.map((t, idx) => (
            <div key={t.id || idx} className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-800">
              <Quote className="absolute top-6 right-6 text-blue-100 dark:text-gray-800 group-hover:text-blue-500 transition-colors duration-300 transform group-hover:rotate-12" size={48} />

              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic relative z-10">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-800" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFeedback}
      />
    </section>
  );
};