import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

interface ProductDetailProps {
  setCartCount: (count: number) => void;
}

export default function ProductDetail({ setCartCount }: ProductDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [isAdded, setIsAdded] = useState(false);

  // Mock product data
  const product = {
    id,
    name: 'Premium Yoga Leggings',
    price: 89000,
    originalPrice: 120000,
    rating: 4.8,
    reviews: 234,
    image: '🧘',
    description: 'Experience ultimate comfort and style with our premium yoga leggings. Crafted from high-quality, moisture-wicking fabric that keeps you dry and comfortable during intense workouts.',
    features: [
      'High-waisted design for extra support',
      'Moisture-wicking technology',
      'Four-way stretch fabric',
      'Pockets for essentials',
      'Anti-slip waistband',
      'Breathable and lightweight',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Burgundy', 'Sage Green'],
    material: '87% Nylon, 13% Spandex',
    care: 'Machine wash cold, lay flat to dry',
    stock: 15,
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    setIsAdded(true);
    setCartCount(existingCart.length);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="section-padding">
      <div className="container-luxury">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm text-luxury-600 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-accent-charcoal">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-accent-charcoal">Shop</button>
          <span>/</span>
          <span className="text-accent-charcoal font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="bg-luxury-100 rounded-xl p-12 text-9xl flex items-center justify-center mb-6 relative">
              {product.image}
              {discount > 0 && (
                <div className="absolute top-6 right-6 bg-accent-rose text-white px-4 py-2 rounded-full font-bold">
                  -{discount}%
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-luxury-100 rounded-lg p-4 text-center text-4xl cursor-pointer hover:ring-2 hover:ring-accent-charcoal">
                  {product.image}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-luxury text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent-gold text-xl">★</span>
                ))}
              </div>
              <span className="text-luxury-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-accent-charcoal">₭{product.price.toLocaleString()}</span>
              <span className="text-2xl text-luxury-500 line-through">₭{product.originalPrice.toLocaleString()}</span>
              <span className="bg-accent-rose text-white px-3 py-1 rounded-full text-sm font-bold">Save ₭{(product.originalPrice - product.price).toLocaleString()}</span>
            </div>

            <div className="divider-luxury mb-6"></div>

            {/* Description */}
            <p className="text-luxury-600 mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Size</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-accent-charcoal bg-accent-charcoal text-white'
                        : 'border-luxury-300 hover:border-accent-charcoal'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Color: {selectedColor}</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-accent-charcoal ring-2 ring-offset-2 ring-accent-charcoal' : 'border-luxury-300'
                    }`}
                    style={{
                      backgroundColor: color === 'Black' ? '#000' : color === 'Navy' ? '#001f3f' : color === 'Burgundy' ? '#800020' : '#9dc183',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-luxury-300 rounded-lg hover:bg-luxury-100"
                >
                  −
                </button>
                <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-luxury-300 rounded-lg hover:bg-luxury-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 btn-luxury transition-all ${isAdded ? 'bg-green-600 hover:bg-green-700' : ''}`}
              >
                {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button className="w-12 h-12 border-2 border-luxury-300 rounded-lg hover:border-accent-charcoal transition-colors flex items-center justify-center">
                <Heart size={20} />
              </button>
              <button className="w-12 h-12 border-2 border-luxury-300 rounded-lg hover:border-accent-charcoal transition-colors flex items-center justify-center">
                <Share2 size={20} />
              </button>
            </div>

            {/* Stock Status */}
            <div className="bg-luxury-50 rounded-lg p-4 mb-8">
              <p className="text-sm">
                <span className={product.stock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}
                </span>
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <Truck size={20} className="text-accent-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-luxury-600">On orders over ₭100,000</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Shield size={20} className="text-accent-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-sm text-luxury-600">100% safe and encrypted</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <RotateCcw size={20} className="text-accent-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-sm text-luxury-600">30-day return policy</p>
                </div>
              </div>
            </div>

            <div className="divider-luxury my-8"></div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-sm text-luxury-600">MATERIAL</p>
                <p>{product.material}</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-luxury-600">CARE INSTRUCTIONS</p>
                <p>{product.care}</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-luxury-600 mb-2">FEATURES</p>
                <ul className="space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm">✓ {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <h2 className="font-luxury text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-luxury">
                <div className="bg-luxury-100 rounded-lg p-8 text-6xl flex items-center justify-center mb-4">
                  👕
                </div>
                <h3 className="font-semibold mb-2">Related Product {i}</h3>
                <p className="text-accent-charcoal font-bold mb-2">₭{(79000 + i * 10000).toLocaleString()}</p>
                <button className="w-full btn-luxury-outline text-sm py-2">View Product</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
