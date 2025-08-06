import { useEffect, useState } from 'react';
import { Product } from '../models/Product';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.title}: {p.descriptionText}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { App };