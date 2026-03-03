import React from 'react';
import { Code2, PenTool, Database, Rocket } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a192f] dark:bg-[#020617] relative overflow-hidden transition-colors duration-300">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-5"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto glass-light dark:glass-dark p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-cyan-400 to-blue-600">
                                <img src="https://picsum.photos/300/300" alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg">
                                <Rocket className="text-blue-600" size={24} />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-block px-3 py-1 bg-blue-100/10 text-blue-400 rounded-full text-xs font-bold mb-3 uppercase tracking-wider border border-blue-500/20">
                                O Especialista
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                                Construindo pontes entre o <span className="text-blue-600">caos</span> e a <span className="text-cyan-500">eficiência</span>
                            </h2>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <p>
                                    Olá! Sou um desenvolvedor de sistemas apaixonado por resolver problemas reais.
                                    Com anos de experiência, percebi que a tecnologia só faz sentido quando melhora a vida das pessoas.
                                </p>
                                <p>
                                    Não crio apenas aplicações; crio <strong>sistemas que trabalham por você</strong>.
                                    Se você está cansado de planilhas infinitas e processos manuais, eu tenho a solução.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                                {[
                                    { icon: <Code2 size={18} />, label: "Web Apps" },
                                    { icon: <Database size={18} />, label: "Sistemas de Gestão" },
                                    { icon: <PenTool size={18} />, label: "UI/UX Design" },
                                ].map((skill, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {skill.icon}
                                        <span>{skill.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};