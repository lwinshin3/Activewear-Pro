import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-accent-charcoal text-white mt-20">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-luxury text-xl font-bold mb-4 text-accent-gold">Activewear Pro</h3>
            <p className="text-luxury-300 text-sm mb-4">
              Premium activewear for the modern athlete. Designed for comfort, style, and performance.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/activewearpro2020" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-accent-gold transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-accent-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent-gold transition-colors">Contact</Link></li>
              <li><Link to="/order-tracking" className="hover:text-accent-gold transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-gold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent-gold transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-accent-gold transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-accent-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-accent-gold transition-colors">Care Instructions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-gold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <Phone size={16} className="flex-shrink-0 mt-1" />
                <span>+95 9 123 456 789</span>
              </div>
              <div className="flex gap-2">
                <Mail size={16} className="flex-shrink-0 mt-1" />
                <span>info@activewearpro.com</span>
              </div>
              <div className="flex gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-1" />
                <span>Yangon, Myanmar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-luxury mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-luxury-400">
          <p>&copy; 2024 Activewear Pro. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
