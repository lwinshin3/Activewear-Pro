import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Truck, Shield, Award } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Zap, title: 'Premium Quality', description: 'Crafted with the finest materials' },
    { icon: Truck, title: 'Fast Delivery', description: 'Quick shipping across Myanmar' },
    { icon: Shield, title: 'Secure Shopping', description: 'Safe and encrypted transactions' },
    { icon: Award, title: 'Trusted Brand', description: '34K+ satisfied customers' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-luxury-900 via-accent-charcoal to-luxury-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-rose rounded-full blur-3xl"></div>
        </div>

        <div className="container-luxury section-padding relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-luxury font-bold mb-6 leading-tight">
                Elevate Your <span className="text-accent-gold">Active</span> Lifestyle
              </h1>
              <p className="text-lg text-luxury-200 mb-8 leading-relaxed">
                Premium activewear designed for performance, comfort, and style. Join 34,000+ customers who trust Activewear Pro for their fitness journey.
              </p>
              <div className="flex gap-4">
                <Link to="/shop" className="btn-luxury flex items-center gap-2">
                  Shop Now <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn-luxury-outline text-white border-white hover:bg-white hover:text-accent-charcoal">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold to-accent-rose rounded-2xl blur-2xl opacity-30"></div>
                <div className="relative bg-gradient-to-br from-accent-gold/20 to-accent-rose/20 rounded-2xl p-12 border border-white/10">
                  <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center">
                    <span className="text-6xl">👟</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <h2 className="text-center font-luxury text-4xl font-bold mb-16">Why Choose Activewear Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card-luxury text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-rose rounded-full flex items-center justify-center">
                    <feature.icon size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-luxury text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-luxury-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <h2 className="text-center font-luxury text-4xl font-bold mb-16">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Leggings', 'Tops', 'Sports Bras'].map((category, idx) => (
              <Link key={idx} to={`/shop?category=${category.toLowerCase()}`}>
                <div className="relative group overflow-hidden rounded-xl h-80 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-luxury-400 to-luxury-600 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-4xl font-luxury font-bold text-white mb-4">{category}</h3>
                      <p className="text-white/80 flex items-center justify-center gap-2">
                        Explore <ArrowRight size={20} />
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-accent-charcoal to-luxury-800 text-white">
        <div className="container-luxury text-center">
          <h2 className="font-luxury text-4xl font-bold mb-6">Exclusive Offer for New Customers</h2>
          <p className="text-xl text-luxury-200 mb-8 max-w-2xl mx-auto">
            Get 15% off your first purchase with code <span className="font-bold text-accent-gold">WELCOME15</span>
          </p>
          <Link to="/shop" className="btn-gold inline-block">
            Start Shopping Now
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-luxury-50">
        <div className="container-luxury max-w-2xl mx-auto text-center">
          <h2 className="font-luxury text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-luxury-600 mb-8">Subscribe to get exclusive offers and new product launches</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-luxury flex-1"
            />
            <button className="btn-luxury whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
