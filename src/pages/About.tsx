import { Award, Target, Heart, Zap } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-luxury-900 to-accent-charcoal text-white">
        <div className="container-luxury text-center">
          <h1 className="font-luxury text-5xl font-bold mb-6">About Activewear Pro</h1>
          <p className="text-xl text-luxury-200 max-w-2xl mx-auto">
            Empowering athletes and fitness enthusiasts across Myanmar with premium activewear that combines style, comfort, and performance.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-luxury text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-luxury-600 mb-4 leading-relaxed">
                Activewear Pro was founded with a simple mission: to bring world-class activewear to Myanmar at accessible prices. We started as a small Facebook shop in 2020 with just a handful of products and a big dream.
              </p>
              <p className="text-luxury-600 mb-4 leading-relaxed">
                Today, we've grown to serve over 34,000 satisfied customers across Myanmar. Every piece of clothing we sell is carefully selected for quality, comfort, and style. We believe that everyone deserves to feel confident and comfortable while pursuing their fitness goals.
              </p>
              <p className="text-luxury-600 leading-relaxed">
                Our journey has been incredible, and we're just getting started. With this new e-commerce platform, we're making it even easier for you to access premium activewear whenever and wherever you want.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent-gold to-accent-rose rounded-2xl p-12 text-center text-9xl flex items-center justify-center">
              👟
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-luxury-50">
        <div className="container-luxury">
          <h2 className="font-luxury text-4xl font-bold text-center mb-16">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="card-luxury">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-rose rounded-full flex items-center justify-center">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="font-luxury text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-luxury-600 leading-relaxed">
                To empower every individual in Myanmar to achieve their fitness goals by providing premium, affordable, and stylish activewear that inspires confidence and performance.
              </p>
            </div>
            <div className="card-luxury">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-rose to-accent-charcoal rounded-full flex items-center justify-center">
                  <Zap size={32} className="text-white" />
                </div>
                <h3 className="font-luxury text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-luxury-600 leading-relaxed">
                To become Myanmar's most trusted and beloved activewear brand, recognized for exceptional quality, innovative design, and outstanding customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-luxury">
          <h2 className="font-luxury text-4xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Quality', desc: 'Premium materials and craftsmanship in every product' },
              { icon: Heart, title: 'Customer Care', desc: 'Your satisfaction is our top priority' },
              { icon: Zap, title: 'Innovation', desc: 'Constantly improving and evolving our products' },
              { icon: Target, title: 'Integrity', desc: 'Honest, transparent, and ethical business practices' },
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-rose rounded-full flex items-center justify-center">
                    <value.icon size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-luxury text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-luxury-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gradient-to-r from-accent-charcoal to-luxury-800 text-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-accent-gold mb-2">34K+</p>
              <p className="text-luxury-200">Happy Customers</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-accent-gold mb-2">100%</p>
              <p className="text-luxury-200">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-accent-gold mb-2">500+</p>
              <p className="text-luxury-200">Products</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-accent-gold mb-2">4.8★</p>
              <p className="text-luxury-200">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-luxury">
          <h2 className="font-luxury text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Lwin Shin', role: 'Founder & CEO', emoji: '👔' },
              { name: 'Quality Team', role: 'Product Curation', emoji: '✅' },
              { name: 'Customer Care', role: 'Support Excellence', emoji: '💬' },
            ].map((member, idx) => (
              <div key={idx} className="card-luxury text-center">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-luxury-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-luxury-50">
        <div className="container-luxury text-center">
          <h2 className="font-luxury text-4xl font-bold mb-6">Join the Activewear Pro Community</h2>
          <p className="text-luxury-600 mb-8 max-w-2xl mx-auto">
            Be part of a movement that's transforming fitness culture in Myanmar. Shop now and experience the difference quality makes.
          </p>
          <a href="/shop" className="btn-luxury inline-block">
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}
