import React, { useState } from 'react';

export default function KoreanSkincareStore() {
  const initialProducts = [
    {
      id: 'p1',
      title: 'Essence Hidratante de Ginseng',
      brand: 'SeoulCare',
      price: 18.9,
      stock: 24,
      img: 'https://via.placeholder.com/360x360?text=Essence+Ginseng',
      short: 'Esencia ligera con ginseng para revitalizar la piel.',
      ingredients: ['Ginseng', 'Niacinamida', 'Pantenol'],
      details: 'Essence ligera, rápida absorción, para todo tipo de piel. Ideal para rutinas AM/PM. 50ml.',
    },
    {
      id: 'p2',
      title: 'Crema Hidratante Centella',
      brand: 'K-Glow',
      price: 22.5,
      stock: 12,
      img: 'https://via.placeholder.com/360x360?text=Crema+Centella',
      short: 'Crema calmante con centella asiática para pieles sensibles.',
      ingredients: ['Centella Asiatica', 'Ceramidas', 'Aloe Vera'],
      details: 'Textura gel-crema, 60ml. Reduce rojeces y mejora la barrera cutánea.',
    },
    {
      id: 'p3',
      title: 'Tint Lip Balm - Tono Coral',
      brand: 'Poreless',
      price: 9.99,
      stock: 40,
      img: 'https://via.placeholder.com/360x360?text=Tint+Coral',
      short: 'Bálsamo con color y acabado natural. Hidrata por horas.',
      ingredients: ['Manteca de karité', 'Aceite de jojoba'],
      details: 'Fácil de aplicar, portable. 5g.',
    },
  ];

  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');

  function addToCart(product) {
    setCart((c) => {
      const exists = c.find((i) => i.id === product.id);
      if (exists) {
        return c.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + 1, i.stock) } : i
        );
      }
      return [...c, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((c) => c.filter((i) => i.id !== id));
  }

  const filtered = products.filter((p) =>
    (p.title + ' ' + p.brand + ' ' + p.short).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">K-Beauty Boutique</h1>
        <input
          className="border rounded-lg px-3 py-2 text-sm"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="ml-4">🛒 {cart.reduce((s, i) => s + i.qty, 0)}</div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Catálogo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow p-4">
              <img src={p.img} alt={p.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.brand}</p>
              <p className="text-gray-600 mt-2">{p.short}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="font-bold">${p.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600"
                >
                  Añadir
                </button>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-10 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Carrito</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío.</p>
          ) : (
            cart.map((i) => (
              <div key={i.id} className="flex justify-between items-center mb-2">
                <span>{i.title} x {i.qty}</span>
                <button
                  onClick={() => removeFromCart(i.id)}
                  className="text-red-500 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
