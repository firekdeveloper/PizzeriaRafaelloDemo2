import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-dark-rich">
      <div className="absolute inset-0 z-0">
        <Image src="/Raffaello.png" alt="Ambiente" fill className="object-cover opacity-60 scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-dark-rich/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-6 w-full max-w-[1400px] mx-auto">
        <span className="block text-[10px] uppercase tracking-[0.6em] mb-6 text-gold-premium font-bold">L'arte della Vera Pizza Italiana</span>
        <h1 className="title-serif text-5xl md:text-7xl lg:text-8xl mb-8 italic leading-[1.1]">Autenticidad Italiana, <br className="hidden md:block" /> Elevada a Lujo</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light text-stone-200">Experiencia gastronómica premium en el corazón de la tradición.</p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="#reservas" className="px-12 py-5 bg-gold-premium text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-dark-rich transition-all duration-500">Reserva tu Mesa</a>
          <a href="#carta" className="px-12 py-5 border border-white/30 text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white/10 backdrop-blur-md transition-all duration-500">Explorar Carta</a>
        </div>
      </div>
    </div>
  );
}