import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Menu from "../components/Menu";
import BookingSection from "../components/BookingSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="w-full max-w-[1800px] mx-auto px-[5%] py-32 space-y-48">
        <section id="carta" className="scroll-mt-32"><Menu /></section>
        <section id="reservas" className="scroll-mt-32 pb-20"><BookingSection /></section>
      </div>
      <footer className="py-20 border-t border-stone-200 bg-white text-center">
        <div className="title-serif italic text-3xl mb-4 text-dark-rich">Raffaello</div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-stone-400">Roma · Madrid · Londres</p>
      </footer>
      {/* Trigger redeploy - test */}
    </main>
  );
}