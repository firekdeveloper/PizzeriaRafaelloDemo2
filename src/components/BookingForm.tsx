'use client';
import { useState, useEffect, type FormEvent } from 'react';

const AVAILABLE_SLOTS = ["13:00", "13:30", "14:00", "14:30", "20:30", "21:00", "21:30", "22:00"];

export default function BookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!showSuccessModal) return;

    const timeoutId = setTimeout(() => {
      setShowSuccessModal(false);
    }, 2600);

    return () => clearTimeout(timeoutId);
  }, [showSuccessModal]);

  const isFormReady =
    name.trim().length >= 2 &&
    phone.trim().length >= 8 &&
    Number(guests) >= 1 &&
    selectedDate &&
    selectedTime;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormReady) {
      setErrorMessage('Completa los datos minimos: nombre, telefono, personas, fecha y horario.');
      return;
    }

    setErrorMessage('');
    setShowSuccessModal(true);

    setName('');
    setPhone('');
    setGuests('2');
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-16 shadow-2xl border border-stone-200 max-w-5xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10 text-left">
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-3 block">Nombre</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Tu nombre"
              className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none transition-colors italic"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-3 block">Telefono</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Ej. 612345678"
              className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-3 block">Personas</label>
            <input
              required
              min={1}
              max={12}
              type="number"
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-3 block">Fecha</label>
            <input
              required
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
                if (errorMessage) setErrorMessage('');
              }}
              className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none"
            />
          </div>
        </div>

        <div className="text-left">
          <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-8 block">Horarios Disponibles</label>
          {!selectedDate ? (
            <div className="h-40 flex items-center justify-center border-2 border-dashed border-stone-100 text-stone-400 italic text-sm">Seleccione una fecha...</div>
          ) : loading ? (
             <div className="h-40 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-premium border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {AVAILABLE_SLOTS.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setSelectedTime(t);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className={`py-4 text-xs transition-all border ${selectedTime === t ? 'bg-gold-premium text-white border-gold-premium' : 'bg-white text-stone-600 border-stone-200 hover:border-gold-premium'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          <p className="mt-8 text-xs text-stone-500">
            Minimo para reservar: nombre, telefono, personas, fecha y horario.
          </p>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-8 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 text-left">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="w-full mt-10 py-6 bg-dark-rich text-white hover:bg-gold-premium transition-all uppercase tracking-[0.4em] text-[11px] font-bold disabled:bg-stone-400 disabled:cursor-not-allowed"
        disabled={!isFormReady}
      >
        Confirmar Reserva Privada
      </button>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40">
          <div className="w-full max-w-md border border-stone-200 bg-white shadow-2xl p-8 text-center">
            <span className="block text-gold-premium uppercase tracking-[0.25em] text-[10px] font-bold mb-3">
              Reserva Enviada
            </span>
            <h3 className="title-serif text-3xl italic mb-4">Gracias por elegirnos</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Hemos recibido tu solicitud. Te confirmaremos la reserva por telefono en breve.
            </p>
          </div>
        </div>
      )}
    </>
  );
}