import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Menu from "../components/Menu";
import BookingSection from "../components/BookingSection";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section id="inicio" className="scroll-mt-32">
        <Hero />
      </section>
      <div className="w-full max-w-[1800px] mx-auto px-[5%] py-32 space-y-48">
        <section id="carta" className="scroll-mt-32"><Menu /></section>
        <section id="reservas" className="scroll-mt-32 pb-20"><BookingSection /></section>
      </div>
      <footer className="py-14 border-t border-stone-200 bg-white">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="title-serif italic text-3xl mb-2 text-dark-rich">Raffaello</div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-stone-400">Roma · Madrid · Londres</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#" className="px-4 py-2 text-xs border border-stone-300 text-stone-700 hover:border-gold-premium hover:text-gold-premium transition-colors">Aviso legal</a>
              <a href="#" className="px-4 py-2 text-xs border border-stone-300 text-stone-700 hover:border-gold-premium hover:text-gold-premium transition-colors">Politica de privacidad</a>
              <a href="#" className="px-4 py-2 text-xs border border-stone-300 text-stone-700 hover:border-gold-premium hover:text-gold-premium transition-colors">Politica de cookies</a>
              <a href="#" className="px-4 py-2 text-xs border border-stone-300 text-stone-700 hover:border-gold-premium hover:text-gold-premium transition-colors">Terminos y condiciones</a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-stone-500">
              © {currentYear} Pizzeria Raffaello. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-500">
              <a href="#" className="hover:text-gold-premium transition-colors">Contacto</a>
              <a href="#" className="hover:text-gold-premium transition-colors">Trabaja con nosotros</a>
              <a href="#" className="hover:text-gold-premium transition-colors">Accesibilidad</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}