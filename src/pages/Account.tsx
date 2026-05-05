import { useState } from 'react';
import { User, LogOut, History, Heart } from 'lucide-react';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isLoggedIn) {
    return (
      <div className="section-padding">
        <div className="container-luxury max-w-2xl mx-auto">
          <h1 className="font-luxury text-4xl font-bold mb-12 text-center">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Login */}
            <div className="card-luxury">
              <h2 className="font-semibold text-xl mb-6">Login</h2>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-luxury"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-luxury"
                />
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="btn-luxury w-full"
                >
                  Login
                </button>
                <p className="text-sm text-center text-luxury-600">
                  Forgot password? <a href="#" className="text-accent-charcoal font-semibold hover:text-accent-rose">Reset here</a>
                </p>
              </div>
            </div>

            {/* Register */}
            <div className="card-luxury">
              <h2 className="font-semibold text-xl mb-6">Create Account</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-luxury"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-luxury"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-luxury"
                />
                <button className="btn-luxury-outline w-full">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-luxury">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-luxury text-4xl font-bold">My Account</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="btn-luxury-outline flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-luxury-200">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'orders', label: 'Order History', icon: History },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-accent-charcoal text-accent-charcoal'
                  : 'border-transparent text-luxury-600 hover:text-accent-charcoal'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card-luxury">
                <h2 className="font-semibold text-xl mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-luxury"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-luxury"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-luxury mb-4 w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-luxury mb-4 w-full"
                />

                <h3 className="font-semibold text-lg mb-4 mt-8">Shipping Address</h3>
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-luxury mb-4 w-full"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-luxury mb-4 w-full"
                />

                <button className="btn-luxury">Save Changes</button>
              </div>
            </div>

            <div>
              <div className="card-luxury">
                <h3 className="font-semibold text-lg mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-2 hover:bg-luxury-50 rounded-lg transition-colors">
                    Change Password
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-luxury-50 rounded-lg transition-colors">
                    Email Preferences
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-luxury-50 rounded-lg transition-colors">
                    Privacy Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-luxury-50 rounded-lg transition-colors text-accent-rose">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="card-luxury">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold">Order #ORD-{Date.now() - order * 1000000}</p>
                      <p className="text-sm text-luxury-600">Placed on {new Date(Date.now() - order * 86400000).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order === 1 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order === 1 ? 'Delivered' : 'In Transit'}
                    </span>
                  </div>
                  <div className="divider-luxury mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-luxury-600">3 items</p>
                      <p className="font-semibold">₭{(89000 * 3).toLocaleString()}</p>
                    </div>
                    <button className="btn-luxury-outline text-sm">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="card-luxury">
                  <div className="bg-luxury-100 rounded-lg p-8 text-6xl flex items-center justify-center mb-4">
                    👕
                  </div>
                  <h3 className="font-semibold mb-2">Wishlist Item {item}</h3>
                  <p className="text-accent-charcoal font-bold mb-4">₭{(79000 + item * 10000).toLocaleString()}</p>
                  <button className="btn-luxury w-full text-sm">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
