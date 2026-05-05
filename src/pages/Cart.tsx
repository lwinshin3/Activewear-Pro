import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CartProps {
  setCartCount: (count: number) => void;
}

export default function Cart({ setCartCount }: CartProps) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCartCount(updated.length);
  };

  const applyCoupon = () => {
    if (couponCode === 'WELCOME15') {
      setDiscount(0.15);
    } else if (couponCode === 'SAVE10') {
      setDiscount(0.10);
    } else {
      alert('Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.05;
  const shipping = subtotal > 100000 ? 0 : 5000;
  const total = subtotal - discountAmount + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-luxury text-center py-20">
          <h1 className="font-luxury text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-luxury-600 mb-8">Start shopping to add items to your cart</p>
          <Link to="/shop" className="btn-luxury inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-luxury">
        <h1 className="font-luxury text-4xl font-bold mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="card-luxury flex gap-6">
                  <div className="w-24 h-24 bg-luxury-100 rounded-lg flex items-center justify-center text-5xl flex-shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-luxury-600 mb-3">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-lg font-bold text-accent-charcoal">
                      ₭{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-luxury-600 hover:text-accent-rose transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="flex items-center gap-2 border border-luxury-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-luxury-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-luxury-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-bold">
                      ₭{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link to="/shop" className="text-accent-charcoal hover:text-accent-rose font-semibold mt-6 inline-block">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card-luxury sticky top-24">
              <h2 className="font-luxury text-2xl font-bold mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="input-luxury flex-1 text-sm"
                  />
                  <button onClick={applyCoupon} className="btn-luxury text-sm px-4 py-2">
                    Apply
                  </button>
                </div>
                <p className="text-xs text-luxury-600 mt-2">Try: WELCOME15 or SAVE10</p>
              </div>

              <div className="divider-luxury mb-6"></div>

              {/* Pricing Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-600">Subtotal</span>
                  <span className="font-semibold">₭{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({Math.round(discount * 100)}%)</span>
                    <span className="font-semibold">-₭{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-600">Tax (5%)</span>
                  <span className="font-semibold">₭{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-600">
                    Shipping {shipping === 0 ? '(FREE)' : ''}
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `₭${shipping.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="divider-luxury mb-6"></div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-luxury text-lg font-bold">Total</span>
                <span className="text-3xl font-bold text-accent-charcoal">
                  ₭{total.toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="btn-luxury w-full mb-3"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/shop')}
                className="btn-luxury-outline w-full"
              >
                Continue Shopping
              </button>

              {/* Info */}
              <div className="mt-6 p-4 bg-luxury-50 rounded-lg text-xs text-luxury-600">
                <p className="mb-2">✓ Free shipping on orders over ₭100,000</p>
                <p className="mb-2">✓ Secure checkout with SSL encryption</p>
                <p>✓ 30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
