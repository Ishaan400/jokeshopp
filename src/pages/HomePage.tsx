import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Sparkles, AlertTriangle, Zap, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth();
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/products${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`);
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(product);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Joke Shop Extraordinaire</h1>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <span>Welcome, {user.name}</span>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hover:text-pink-200 transition"
              >
                Login
              </button>
            )}
            <button 
              onClick={() => navigate('/cart')}
              className="relative hover:text-pink-200 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart && cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto pt-8 px-4">
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4">
          <Filter className="h-5 w-5 text-pink-600" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-white text-pink-600 border border-pink-500'
              } hover:from-pink-600 hover:to-purple-700 transition`}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <Sparkles className="h-5 w-5 text-pink-500" />
                </div>
                <span className="text-sm text-gradient mb-2 inline-block">{product.category}</span>
                <p className="text-gray-600 mb-4">{product.description}</p>
                {product.warning && (
                  <div className="flex items-center gap-1 text-amber-600 text-sm mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{product.warning}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gradient">${product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-pink-600 hover:to-purple-700 transition"
                  >
                    <Zap className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;