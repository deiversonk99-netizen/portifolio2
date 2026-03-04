import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AppShowcase } from './components/AppShowcase';
import { Testimonials } from './components/Testimonials';
import { InteractiveExperience } from './components/InteractiveExperience';
import { Contact } from './components/Contact';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminCheck = () => {
    const email = prompt("Digite seu email admin:");
    if (email === "deiversonk99@gmail.com") {
      setIsAdmin(true);
      alert("Acesso Administrativo Concedido");
    } else if (email !== null) {
      alert("Acesso Negado");
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

        <Testimonials allowFeedback={true} isAdmin={isAdmin} />
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