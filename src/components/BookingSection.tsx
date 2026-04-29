import BookingForm from "./BookingForm";

export default function BookingSection() {
  return (
    <section id="reservas" className="py-24 bg-white dark:bg-dark-rich">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-gold-premium uppercase tracking-[0.3em] text-xs mb-4 block">Disponibilidad</span>
        <h2 className="title-serif text-4xl md:text-5xl mb-8 italic">Reserva tu Experiencia</h2>
        <p className="text-gray-500 mb-16 font-light max-w-lg mx-auto">
          Asegure su mesa en Pizzeria Raffaello y déjese seducir por la alta cocina italiana en un entorno señorial.
        </p>
        
        {/* Aquí llamamos al componente de cliente */}
        <BookingForm />
      </div>
    </section>
  );
}