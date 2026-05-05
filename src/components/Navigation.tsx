import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
}

export default function Navigation({ cartCount }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-luxury-200 shadow-sm">
      <div className="container-luxury">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent-charcoal rounded-lg flex items-center justify-center">
              <span className="text-white font-luxury text-lg font-bold">AP</span>
            </div>
            <span className="font-luxury text-xl font-bold text-accent-charcoal hidden sm:inline">
              Activewear Pro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-accent-charcoal hover:text-accent-rose transition-colors font-medium">
              Shop
            </Link>
            <Link to="/about" className="text-accent-charcoal hover:text-accent-rose transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-accent-charcoal hover:text-accent-rose transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-luxury-100 rounded-lg px-3 py-2">
              <Search size={18} className="text-luxury-600" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none ml-2 text-sm w-32"
              />
            </div>

            <Link to="/cart" className="relative">
              <ShoppingBag size={24} className="text-accent-charcoal hover:text-accent-rose transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-rose text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-accent-charcoal"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-luxury-200 py-4 space-y-3">
            <Link to="/shop" className="block text-accent-charcoal hover:text-accent-rose font-medium">
              Shop
            </Link>
            <Link to="/about" className="block text-accent-charcoal hover:text-accent-rose font-medium">
              About
            </Link>
            <Link to="/contact" className="block text-accent-charcoal hover:text-accent-rose font-medium">
              Contact
            </Link>
            <Link to="/account" className="block text-accent-charcoal hover:text-accent-rose font-medium">
              Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
