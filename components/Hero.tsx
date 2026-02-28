import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Phone3D } from './Phone3D';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-sm mb-6 animate-fade-in-up">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Bem-vindo à transformação digital
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-gray-900 dark:text-white">
            A era moderna da <br />
            <span className="text-gradient">Digitalização</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Transforme processos manuais em <strong>aplicativos inteligentes</strong>.
            Aumente a eficiência, reduza custos e tenha controle total do seu negócio
            com soluções desenhadas sob medida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#apps" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-1 flex items-center justify-center gap-2">
              Ver Protótipos
              <ArrowRight size={20} />
            </a>
            <a href="#contact" className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all hover:-translate-y-1">
              Falar Conosco
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">+50</div>
            </div>
            <p><strong>+50 empresas</strong> já digitalizadas</p>
          </div>
        </div>

        {/* Visual Content - Interactive 3D Mockup */}
        <div className="relative hidden lg:flex justify-center items-center h-[700px] w-full">
          <Phone3D />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-blue-500">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};