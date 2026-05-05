import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate order placement
    setOrderPlaced(true);
    setTimeout(() => {
      navigate('/order-tracking');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="section-padding">
        <div className="container-luxury max-w-2xl mx-auto text-center py-20">
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-green-600" />
          </div>
          <h1 className="font-luxury text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-luxury-600 mb-8">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div className="bg-luxury-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-luxury-600 mb-2">Order Number</p>
            <p className="font-luxury text-2xl font-bold text-accent-charcoal">ORD-{Date.now()}</p>
          </div>
          <p className="text-luxury-600 mb-8">
            You will receive a confirmation email at <span className="font-semibold">{formData.email}</span>
          </p>
          <button
            onClick={() => navigate('/order-tracking')}
            className="btn-luxury"
          >
            Track Your Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-luxury max-w-4xl mx-auto">
        <h1 className="font-luxury text-4xl font-bold mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="flex gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s
                        ? 'bg-accent-charcoal text-white'
                        : 'bg-luxury-200 text-luxury-600'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-1 w-12 ${
                        step > s ? 'bg-accent-charcoal' : 'bg-luxury-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Shipping Information */}
            {step === 1 && (
              <div className="card-luxury mb-8">
                <h2 className="font-semibold text-xl mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="input-luxury"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="input-luxury"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-luxury mb-4 w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-luxury mb-4 w-full"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-luxury mb-4 w-full"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="input-luxury"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="input-luxury"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="btn-luxury w-full mt-6"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {/* Shipping Method */}
            {step === 2 && (
              <div className="card-luxury mb-8">
                <h2 className="font-semibold text-xl mb-6">Shipping Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border-2 border-accent-charcoal rounded-lg cursor-pointer">
                    <input type="radio" name="shipping" defaultChecked className="w-4 h-4" />
                    <div>
                      <p className="font-semibold">Standard Delivery</p>
                      <p className="text-sm text-luxury-600">3-5 business days • ₭5,000</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-luxury-300 rounded-lg cursor-pointer hover:border-accent-charcoal">
                    <input type="radio" name="shipping" className="w-4 h-4" />
                    <div>
                      <p className="font-semibold">Express Delivery</p>
                      <p className="text-sm text-luxury-600">1-2 business days • ₭15,000</p>
                    </div>
                  </label>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-luxury-outline flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-luxury flex-1"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Payment Method */}
            {step === 3 && (
              <div className="card-luxury mb-8">
                <h2 className="font-semibold text-xl mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border-2 border-accent-charcoal rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">Cash on Delivery</p>
                      <p className="text-sm text-luxury-600">Pay when you receive your order</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-luxury-300 rounded-lg cursor-pointer hover:border-accent-charcoal">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">Bank Transfer</p>
                      <p className="text-sm text-luxury-600">Transfer to our bank account</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-luxury-300 rounded-lg cursor-pointer hover:border-accent-charcoal">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">Credit/Debit Card</p>
                      <p className="text-sm text-luxury-600">Secure payment with Stripe</p>
                    </div>
                  </label>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-luxury-outline flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-luxury flex-1 flex items-center justify-center gap-2"
                  >
                    <Lock size={18} /> Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="card-luxury sticky top-24">
              <h2 className="font-semibold text-lg mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-600">Subtotal</span>
                  <span className="font-semibold">₭89,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-600">Shipping</span>
                  <span className="font-semibold">₭5,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-600">Tax (5%)</span>
                  <span className="font-semibold">₭4,700</span>
                </div>
              </div>

              <div className="divider-luxury mb-6"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-accent-charcoal">₭98,700</span>
              </div>

              {/* Security Badge */}
              <div className="bg-luxury-50 rounded-lg p-4 text-center">
                <Lock size={24} className="mx-auto mb-2 text-accent-gold" />
                <p className="text-xs font-semibold text-accent-charcoal">Secure Checkout</p>
                <p className="text-xs text-luxury-600">SSL Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
