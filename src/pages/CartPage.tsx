import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function CartPage() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [checkoutClicked, setCheckoutClicked] = useState(false);

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCart(productId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const total = cart?.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0;

  const handleCheckout = () => {
    if (!checkoutClicked) {
      setCheckoutClicked(true);
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="container mx-auto py-8 px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Shopping
        </button>
        
        <h2 className="text-3xl font-bold mb-8 text-gradient">Your Cart of Laughs</h2>
        
        {!cart || cart.items.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl text-gray-600 mb-4">Your cart is as empty as a comedian's wallet!</h3>
            <button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition"
            >
              Go Find Some Laughs
            </button>
          </div>
        ) : (
          <div className="grid gap-8">
            {cart.items.map(item => (
              <div key={item.product._id} className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-6">
                <img src={item.product.image} alt={item.product.name} className="w-32 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-600">{item.product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-2xl font-bold text-gradient">${item.product.price}</span>
                      <span className="text-gray-600 ml-2">× {item.quantity}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <div className="flex items-center justify-between text-2xl font-bold">
                <span>Total:</span>
                <span className="text-gradient">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={checkoutClicked}
                className={`w-full mt-4 cursor-pointer ${
                  checkoutClicked 
                    ? 'bg-green-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                } text-white px-6 py-3 rounded-lg transition-all duration-300`}
              >
                {checkoutClicked ? "🎉 Redirecting to checkout..." : "Proceed to Checkout"}
              </button>
              <p className="text-center text-sm text-gray-500 mt-2">
                * By clicking checkout, you agree to our terms of never gonna give you up
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;