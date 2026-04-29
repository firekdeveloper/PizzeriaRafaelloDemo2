'use client';
import { useState, useEffect } from 'react';

const AVAILABLE_SLOTS = ["13:00", "13:30", "14:00", "14:30", "20:30", "21:00", "21:30", "22:00"];

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
  }, [selectedDate]);

  return (
    <form className="bg-white p-8 md:p-16 shadow-2xl border border-stone-200 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10 text-left">
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-3 block">Nombre</label>
            <input required type="text" className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none transition-colors italic" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-3 block">Fecha</label>
            <input required type="date" onChange={(e) => setSelectedDate(e.target.value)} className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none" />
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
                <button key={t} type="button" onClick={() => setSelectedTime(t)} className={`py-4 text-xs transition-all border ${selectedTime === t ? 'bg-gold-premium text-white border-gold-premium' : 'bg-white text-stone-600 border-stone-200 hover:border-gold-premium'}`}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <button type="submit" className="w-full mt-16 py-6 bg-dark-rich text-white hover:bg-gold-premium transition-all uppercase tracking-[0.4em] text-[11px] font-bold">Confirmar Reserva Privada</button>
    </form>
  );
}