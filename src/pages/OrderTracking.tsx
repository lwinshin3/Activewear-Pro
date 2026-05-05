import { useState } from 'react';
import { Package } from 'lucide-react';

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<any>(null);

  const handleTrack = () => {
    if (orderNumber) {
      // Mock tracking data
      setTrackingInfo({
        orderNumber,
        status: 'in-transit',
        estimatedDelivery: new Date(Date.now() + 3 * 86400000).toLocaleDateString(),
        items: [
          { name: 'Premium Yoga Leggings', quantity: 1, price: 89000 },
          { name: 'Sports Top', quantity: 1, price: 59000 },
        ],
        total: 148000,
        timeline: [
          { status: 'Order Confirmed', date: new Date(Date.now() - 2 * 86400000).toLocaleDateString(), completed: true },
          { status: 'Processing', date: new Date(Date.now() - 1 * 86400000).toLocaleDateString(), completed: true },
          { status: 'Shipped', date: new Date().toLocaleDateString(), completed: true },
          { status: 'Out for Delivery', date: new Date(Date.now() + 1 * 86400000).toLocaleDateString(), completed: false },
          { status: 'Delivered', date: new Date(Date.now() + 3 * 86400000).toLocaleDateString(), completed: false },
        ],
      });
    }
  };

  return (
    <div className="section-padding">
      <div className="container-luxury max-w-4xl mx-auto">
        <h1 className="font-luxury text-4xl font-bold mb-12 text-center">Track Your Order</h1>

        {/* Search Section */}
        <div className="card-luxury mb-12">
          <h2 className="font-semibold text-xl mb-6">Enter Your Order Number</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="e.g., ORD-1234567890"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
              className="input-luxury flex-1"
            />
            <button onClick={handleTrack} className="btn-luxury">
              Track Order
            </button>
          </div>
          <p className="text-sm text-luxury-600 mt-3">
            You can find your order number in your confirmation email or in your account.
          </p>
        </div>

        {/* Tracking Results */}
        {trackingInfo && (
          <div className="space-y-8">
            {/* Order Header */}
            <div className="card-luxury">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-luxury-600">Order Number</p>
                  <h2 className="font-luxury text-2xl font-bold">{trackingInfo.orderNumber}</h2>
                </div>
                <span className={`px-4 py-2 rounded-full font-semibold ${
                  trackingInfo.status === 'in-transit'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {trackingInfo.status === 'in-transit' ? '📦 In Transit' : '✓ Delivered'}
                </span>
              </div>
              <div className="divider-luxury mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-luxury-600">Estimated Delivery</p>
                  <p className="font-semibold">{trackingInfo.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-luxury-600">Tracking Number</p>
                  <p className="font-semibold">MM-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-luxury-600">Carrier</p>
                  <p className="font-semibold">Myanmar Express</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card-luxury">
              <h3 className="font-semibold text-xl mb-8">Delivery Timeline</h3>
              <div className="space-y-6">
                {trackingInfo.timeline.map((event: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        event.completed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-luxury-200 text-luxury-600'
                      }`}>
                        {event.completed ? '✓' : idx + 1}
                      </div>
                      {idx < trackingInfo.timeline.length - 1 && (
                        <div className={`w-1 h-12 ${event.completed ? 'bg-green-300' : 'bg-luxury-300'}`}></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="font-semibold">{event.status}</p>
                      <p className="text-sm text-luxury-600">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="card-luxury">
              <h3 className="font-semibold text-xl mb-6">Order Items</h3>
              <div className="space-y-4">
                {trackingInfo.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-luxury-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-luxury-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₭{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="divider-luxury my-6"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="text-2xl font-bold text-accent-charcoal">₭{trackingInfo.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-luxury-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-luxury-600 mb-4">
                If you have any questions about your order, please contact our support team.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="tel:+959123456789" className="btn-luxury text-sm">
                  Call Us
                </a>
                <a href="mailto:info@activewearpro.com" className="btn-luxury-outline text-sm">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!trackingInfo && (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-luxury-300 mb-4" />
            <p className="text-luxury-600 text-lg">
              Enter your order number above to track your shipment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
