const products = [
  { id: 1, name: 'Aero Wireless Headphones', category: 'Electronics', price: 2599, rating: 4.8, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80', description: 'Immersive wireless audio with long battery life and premium build quality for everyday listening.' },
  { id: 2, name: 'Smart Fitness Watch', category: 'Electronics', price: 3499, rating: 4.7, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80', description: 'Track steps, sleep, heart rate and workouts with a sleek smartwatch experience.' },
  { id: 3, name: 'Urban Canvas Backpack', category: 'Accessories', price: 1499, rating: 4.6, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', description: 'A durable daily backpack built for commuting, campus life, and weekend travel.' },
  { id: 4, name: 'Classic Cotton Tee', category: 'Clothing', price: 799, rating: 4.5, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', description: 'Soft, breathable cotton that feels effortless from work to weekends.' },
  { id: 5, name: 'Minimalist Desk Lamp', category: 'Home', price: 1899, rating: 4.7, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', description: 'Warm ambient lighting and a compact profile for modern workspaces and bedrooms.' },
  { id: 6, name: 'JavaScript Essentials', category: 'Books', price: 499, rating: 4.4, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80', description: 'A practical guide to modern JavaScript concepts, patterns, and real-world development.' },
  { id: 7, name: 'Travel Coffee Flask', category: 'Accessories', price: 999, rating: 4.5, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', description: 'Stay energized on the move with a leak-proof insulated flask for daily routines.' },
  { id: 8, name: 'Cozy Knit Sweater', category: 'Clothing', price: 1699, rating: 4.8, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80', description: 'A premium knit layer that balances warmth, elegance, and all-day comfort.' },
  { id: 9, name: 'Aroma Diffuser', category: 'Home', price: 2299, rating: 4.6, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', description: 'Create a calming atmosphere with a compact diffuser designed to elevate your room.' },
  { id: 10, name: 'Data Structure Guide', category: 'Books', price: 599, rating: 4.3, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80', description: 'Master core computing principles through crisp explanations and practical examples.' },
  { id: 11, name: 'Leather Smart Wallet', category: 'Accessories', price: 1299, rating: 4.7, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80', description: 'Carry essentials in style with smart card slots and a premium leather finish.' },
  { id: 12, name: 'Bluetooth Speaker', category: 'Electronics', price: 1999, rating: 4.6, image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80', description: 'Portable sound that fills the room with clear, balanced audio and rich bass.' }
];

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const storageKey = 'apexplanet-cart';
