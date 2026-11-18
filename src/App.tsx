import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Mechanism } from './components/Mechanism';
import { Calculator } from './components/Calculator';
import { IKSimulator } from './components/IKSimulator';
import { Roadmap } from './components/Roadmap';
import { RiskHeatmap } from './components/RiskHeatmap';
import { MCA } from './components/MCA';
import { Benchmark } from './components/Benchmark';
import { Foresight } from './components/Foresight';
import { Sources } from './components/Sources';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2A44]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Mechanism />
        <Calculator />
        <IKSimulator />
        <Roadmap />
        <RiskHeatmap />
        <MCA />
        <Benchmark />
        <Foresight />
        <Sources />
      </main>
      <Footer />
    </div>
  );
}
