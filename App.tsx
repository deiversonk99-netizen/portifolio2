import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AppShowcase } from './components/AppShowcase';
import { Testimonials } from './components/Testimonials';
import { InteractiveExperience } from './components/InteractiveExperience';
import { Contact } from './components/Contact';

function App() {
  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Hidden admin trigger: click logo 5 times or enter email in a prompt
  const handleAdminCheck = () => {
    const email = prompt("Digite seu email para acessar o painel admin:");
    if (email === "deiverson@gmail.com") {
      setIsAdmin(true);
      alert("Bem-vindo, Deiverson! Painel Admin Ativado.");
    } else if (email !== null) {
      alert("Acesso negado.");
    }
  };

  return (
    <div className="font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden selection:bg-blue-200 dark:selection:bg-blue-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <AppShowcase />
        <InteractiveExperience />

        {/* Admin Feedback Toggle (Floating or hidden) */}
        {isAdmin && (
          <div className="fixed bottom-4 left-4 z-[99] bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-2xl border border-blue-500 animate-in slide-in-from-bottom-10">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Painel Admin</p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Coletar Feedbacks:</span>
              <button
                onClick={() => setIsFeedbackEnabled(!isFeedbackEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isFeedbackEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isFeedbackEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            <button onClick={() => setIsAdmin(false)} className="mt-2 text-[10px] text-gray-400 hover:text-red-500 block">Sair do Admin</button>
          </div>
        )}

        <Testimonials allowFeedback={isFeedbackEnabled} />
        <Contact />
      </main>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={handleAdminCheck}>
            <span className="text-blue-500">Developer app</span>
          </div>
          <p className="text-gray-400 text-sm">© 2024 Developer app. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;