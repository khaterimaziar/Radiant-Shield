
import React from 'react';
import DoseRateCalculator from './components/DoseRateCalculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 selection:bg-sky-500 selection:text-white">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl font-bold text-sky-400">Radiant Shield</h1>
        <p className="text-lg text-slate-300">Dose Rate Calculator & Radionuclide Information</p>
      </header>
      <main className="w-full max-w-4xl">
        <DoseRateCalculator />
      </main>
      <footer className="w-full max-w-4xl mt-12 text-center text-sm text-slate-500">
        <p>Disclaimer: This calculator is for educational and illustrative purposes only. Do not use for actual radiation protection planning without consulting a qualified expert.</p>
        <p>&copy; {new Date().getFullYear()} AI Enhanced Solutions</p>
      </footer>
    </div>
  );
};

export default App;
