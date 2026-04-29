export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="w-full px-6 md:px-[5%] h-24 flex items-center justify-between">
        <a href="#inicio" className="text-3xl font-bold title-serif tracking-tighter italic text-dark-rich hover:opacity-70 transition-opacity">
          RAFFAELLO
        </a>

        <div className="flex items-center space-x-8 lg:space-x-12">
          <ul className="hidden md:flex items-center space-x-10 text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500">
            <li><a href="#inicio" className="hover:text-gold-premium transition-colors">Inicio</a></li>
            <li><a href="#carta" className="hover:text-gold-premium transition-colors">La Carta</a></li>
          </ul>
          <a href="#reservas" className="px-8 py-4 bg-gold-premium text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-dark-rich transition-all duration-500 shadow-md">
            Reservar
          </a>
        </div>
      </div>
    </nav>
  );
}