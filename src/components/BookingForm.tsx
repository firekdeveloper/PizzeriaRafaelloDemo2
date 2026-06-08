'use client';
import { useState, useEffect, type FormEvent } from 'react';

const AVAILABLE_SLOTS = ["13:00", "13:30", "14:00", "14:30", "20:30", "21:00", "21:30", "22:00"];
const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ' -]+$/;

type FieldErrors = {
  name?: string;
  phone?: string;
  guests?: string;
  date?: string;
  time?: string;
};

type TouchedFields = {
  name: boolean;
  phone: boolean;
  guests: boolean;
  date: boolean;
  time: boolean;
};

export default function BookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    phone: false,
    guests: false,
    date: false,
    time: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMissingTooltip, setShowMissingTooltip] = useState(false);

  const todayISO = new Date().toISOString().split('T')[0];

  const validateFields = (): FieldErrors => {
    const errors: FieldErrors = {};
    const cleanName = name.trim();
    const cleanPhoneDigits = phone.replace(/\D/g, '');
    const guestCount = Number(guests);

    if (cleanName.length < 2) {
      errors.name = 'Introduce un nombre valido (minimo 2 caracteres).';
    } else if (!NAME_REGEX.test(cleanName)) {
      errors.name = 'El nombre solo puede contener letras.';
    }

    if (cleanPhoneDigits.length < 9 || cleanPhoneDigits.length > 15) {
      errors.phone = 'Introduce un telefono valido (entre 9 y 15 digitos).';
    }

    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 12) {
      errors.guests = 'La reserva debe ser para entre 1 y 12 personas.';
    }

    if (!selectedDate) {
      errors.date = 'Selecciona una fecha para la reserva.';
    } else if (selectedDate < todayISO) {
      errors.date = 'La fecha no puede ser anterior a hoy.';
    }

    if (!selectedTime || !AVAILABLE_SLOTS.includes(selectedTime)) {
      errors.time = 'Selecciona un horario disponible.';
    }

    return errors;
  };

  const setFieldTouched = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const updateValidation = () => {
    setFieldErrors(validateFields());
  };

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
  }, [selectedDate]);

  useEffect(() => {
    updateValidation();
  }, [name, phone, guests, selectedDate, selectedTime]);

  useEffect(() => {
    if (!showSuccessModal) return;

    const timeoutId = setTimeout(() => {
      setShowSuccessModal(false);
    }, 2600);

    return () => clearTimeout(timeoutId);
  }, [showSuccessModal]);

  const currentValidation = validateFields();
  const isFormReady = Object.keys(currentValidation).length === 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateFields();
    const hasErrors = Object.keys(errors).length > 0;
    setFieldErrors(errors);

    if (hasErrors) {
      setTouched({
        name: true,
        phone: true,
        guests: true,
        date: true,
        time: true,
      });
      setErrorMessage('Completa los datos minimos: nombre, telefono, personas, fecha y horario.');
      return;
    }

    setShowMissingTooltip(false);
    setFieldErrors({});
    setErrorMessage('');
    setShowSuccessModal(true);

    setName('');
    setPhone('');
    setGuests('2');
    setSelectedDate('');
    setSelectedTime('');
    setTouched({
      name: false,
      phone: false,
      guests: false,
      date: false,
      time: false,
    });
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
              pattern="[A-Za-zÁÉÍÓÚáéíóúÜüÑñ' -]+"
              title="El nombre solo puede contener letras"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              onBlur={() => setFieldTouched('name')}
              placeholder="Tu nombre"
              className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none transition-colors italic"
            />
            {touched.name && fieldErrors.name && <p className="mt-2 text-xs text-red-600">{fieldErrors.name}</p>}
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
              onBlur={() => setFieldTouched('phone')}
              placeholder="Ej. 612345678"
              className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none transition-colors"
            />
            {touched.phone && fieldErrors.phone && <p className="mt-2 text-xs text-red-600">{fieldErrors.phone}</p>}
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
              onBlur={() => setFieldTouched('guests')}
              className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none transition-colors"
            />
            {touched.guests && fieldErrors.guests && <p className="mt-2 text-xs text-red-600">{fieldErrors.guests}</p>}
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-3 block">Fecha</label>
            <input
              required
              type="date"
              min={todayISO}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
                if (errorMessage) setErrorMessage('');
                setTouched((prev) => ({ ...prev, time: false }));
              }}
              onBlur={() => setFieldTouched('date')}
              className="w-full border-b border-stone-300 py-3 focus:border-gold-premium outline-none"
            />
            {touched.date && fieldErrors.date && <p className="mt-2 text-xs text-red-600">{fieldErrors.date}</p>}
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
                    setFieldTouched('time');
                    if (errorMessage) setErrorMessage('');
                  }}
                  className={`py-4 text-xs transition-all border ${selectedTime === t ? 'bg-gold-premium text-white border-gold-premium' : 'bg-white text-stone-600 border-stone-200 hover:border-gold-premium'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {touched.time && fieldErrors.time && <p className="mt-4 text-xs text-red-600">{fieldErrors.time}</p>}

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
        onMouseEnter={() => {
          if (!isFormReady) setShowMissingTooltip(true);
        }}
        onMouseLeave={() => setShowMissingTooltip(false)}
        className={`w-full mt-10 py-6 text-white transition-all uppercase tracking-[0.4em] text-[11px] font-bold ${isFormReady ? 'bg-dark-rich hover:bg-gold-premium' : 'bg-stone-400 cursor-not-allowed'}`}
      >
        Confirmar Reserva Privada
      </button>

      {showMissingTooltip && !isFormReady && (
        <p className="mt-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-4 py-2 text-left">
          Te faltan datos por completar para confirmar la reserva.
        </p>
      )}
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