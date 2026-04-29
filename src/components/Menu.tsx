const menuData = {
  antipasti: [
    { name: "Carpaccio di Manzo Tartufo", desc: "Solomillo de buey, trufa negra, rúcula, lascas de Grana Padano DOP.", price: "24€" },
    { name: "Burrata di Andria con Pesto", desc: "Burrata artesanal, tomates San Marzano confitados, pesto de albahaca fresca.", price: "19€" },
    { name: "Fiori di Zucca Fritti", desc: "Flores de calabacín rellenas de ricotta y anchoas, fritura ligera.", price: "17€" },
    { name: "Tagliere Raffaello (2p)", desc: "Selección premium de embutidos italianos y quesos DOP.", price: "32€" },
    { name: "Vitello Tonnato Reale", desc: "Finas lonchas de ternera blanca con salsa de atún y alcaparras de Pantelleria.", price: "22€" },
    { name: "Parmigiana di Melanzane", desc: "Berenjenas al horno con tomate San Marzano, mozzarella y parmesano 24 meses.", price: "18€" },
  ],
  pizzeRosse: [
    { name: "Margherita Reale", desc: "Tomate San Marzano DOP, Mozzarella di Bufala Campana DOP, albahaca orgánica, aceite EVO.", price: "19€", premium: true },
    { name: "Diavola di Napoli", desc: "Tomate, fior di latte, salami picante napolitano, 'nduja calabresa.", price: "21€" },
    { name: "Prosciutto & Funghi di Bosco", desc: "Tomate, fior di latte, prosciutto cotto de Parma, setas silvestres.", price: "22€" },
    { name: "Quattro Stagioni Elite", desc: "Alcachofas, olivas negras, salami picante y jamón cocido de alta calidad.", price: "24€" },
    { name: "Amatriciana Moderna", desc: "Tomate, guanciale crujiente, pecorino romano y cebolla caramelizada.", price: "23€" },
    { name: "Calzone Raffaello", desc: "Relleno de ricotta artesana, salami, mozzarella y pimienta negra.", price: "22€" },
  ],
  pizzeBianche: [
    { name: "Tartufo e Funghi", desc: "Crema de trufa negra, mix de setas, fior di latte, rúcula y aceite de trufa.", price: "28€", premium: true },
    { name: "Mortadella e Pistacchio", desc: "Fior di latte, mortadela de Bolonia IGP, stracciatella di bufala y pistacho de Bronte.", price: "26€" },
    { name: "Cinque Formaggi", desc: "Gorgonzola picante, taleggio, fontina, mozzarella y lascas de parmigiano.", price: "24€" },
    { name: "Pesto e Pinoli", desc: "Base de fior di latte, pesto casero, tomates cherry confitados y piñones tostados.", price: "23€" },
  ],
  dolci: [
    { name: "Tiramisú Tradizionale", desc: "Bizcocho savoiardi, mascarpone artesano y café espresso selección.", price: "10€" },
    { name: "Panna Cotta al Pistacchio", desc: "Crema cocida con esencia de vainilla y coulis de pistacho siciliano.", price: "9€" },
    { name: "Cannolo Siciliano", desc: "Masa crujiente rellena de ricotta dulce y chispas de chocolate amargo.", price: "8€" },
  ]
};

const MenuItem = ({ name, desc, price, premium }: any) => (
  <div className="group p-8 bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:border-gold-premium/40 transition-all duration-500 flex flex-col justify-between min-h-[200px]">
    <div>
      <div className="flex justify-between items-start gap-4 mb-4">
        <h4 className="title-serif text-2xl italic text-stone-900 group-hover:text-gold-premium transition-colors duration-500 leading-tight">
          {name}
        </h4>
        <span className="title-serif text-xl font-bold text-gold-premium bg-stone-50 px-2 py-1">
          {price}
        </span>
      </div>
      <p className="text-stone-600 text-sm font-normal leading-relaxed pr-4">
        {desc}
      </p>
    </div>
    {premium && (
      <div className="mt-6 flex items-center gap-2">
        <div className="h-[1px] w-4 bg-gold-premium"></div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold-premium font-bold">
          Selezione d'Oro
        </span>
      </div>
    )}
  </div>
);

const MenuSection = ({ title, items }: any) => (
  <div className="mb-24">
    <div className="flex items-center gap-6 mb-12">
      <h3 className="text-sm uppercase tracking-[0.6em] text-stone-900 font-black border-l-4 border-gold-premium pl-4">
        {title}
      </h3>
      <div className="h-[1px] flex-grow bg-stone-300"></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {items.map((item: any, i: number) => (
        <MenuItem key={i} {...item} />
      ))}
    </div>
  </div>
);

export default function Menu() {
  return (
    <div className="w-full">
      <div className="text-center mb-24">
        <span className="text-gold-premium text-[10px] uppercase tracking-[0.6em] mb-4 block font-bold">
          Esperienza Gastronomica
        </span>
        <h2 className="title-serif text-5xl md:text-7xl italic text-dark-rich mb-8">
          La Nostra Carta
        </h2>
        <div className="w-16 h-[2px] bg-gold-premium mx-auto mb-8"></div>
        <p className="text-stone-600 max-w-2xl mx-auto font-light text-lg">
          Un tributo a la herencia italiana, utilizando únicamente productos con denominación de origen protegida.
        </p>
      </div>

      <MenuSection title="Antipasti" items={menuData.antipasti} />
      <MenuSection title="Le Pizze Rosse" items={menuData.pizzeRosse} />
      <MenuSection title="Le Pizze Bianche" items={menuData.pizzeBianche} />
      <MenuSection title="I Nostri Dolci" items={menuData.dolci} />
    </div>
  );
}