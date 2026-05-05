import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock products - Replace with API call
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Yoga Leggings',
        price: 89000,
        originalPrice: 120000,
        image: '🧘',
        category: 'leggings',
        stock: 15,
      },
      {
        id: '2',
        name: 'High-Performance Sports Top',
        price: 59000,
        image: '👕',
        category: 'tops',
        stock: 22,
      },
      {
        id: '3',
        name: 'Supportive Sports Bra',
        price: 79000,
        image: '🏃',
        category: 'sports bras',
        stock: 18,
      },
      {
        id: '4',
        name: 'Breathable Running Shorts',
        price: 49000,
        image: '🩳',
        category: 'shorts',
        stock: 25,
      },
      {
        id: '5',
        name: 'Compression Leggings',
        price: 99000,
        originalPrice: 140000,
        image: '🧘',
        category: 'leggings',
        stock: 12,
      },
      {
        id: '6',
        name: 'Moisture-Wicking Tank Top',
        price: 54000,
        image: '👕',
        category: 'tops',
        stock: 30,
      },
    ];

    setProducts(mockProducts);
    applyFilters(mockProducts, selectedCategory, sortBy, priceRange);
  }, []);

  const applyFilters = (
    items: Product[],
    category: string,
    sort: string,
    price: number[]
  ) => {
    let filtered = items;

    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    filtered = filtered.filter((p) => p.price >= price[0] && p.price <= price[1]);

    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      filtered.reverse();
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(products, category, sortBy, priceRange);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    applyFilters(products, selectedCategory, sort, priceRange);
  };

  const categories = ['Leggings', 'Tops', 'Sports Bras', 'Shorts'];

  return (
    <div className="section-padding">
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-luxury text-4xl font-bold mb-4">Shop Our Collection</h1>
          <p className="text-luxury-600">Discover premium activewear designed for your lifestyle</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
            <div className="card-luxury mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter size={18} /> Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ''}
                      onChange={() => handleCategoryChange('')}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">All Products</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat.toLowerCase()}
                        checked={selectedCategory === cat.toLowerCase()}
                        onChange={() => handleCategoryChange(cat.toLowerCase())}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="divider-luxury mb-6"></div>

              {/* Price Filter */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const newRange = [priceRange[0], parseInt(e.target.value)];
                      setPriceRange(newRange);
                      applyFilters(products, selectedCategory, sortBy, newRange);
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-luxury-600">
                    <span>₭{priceRange[0].toLocaleString()}</span>
                    <span>₭{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-luxury-600">Showing {filteredProducts.length} products</p>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="input-luxury py-2"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden mb-6 btn-luxury-outline w-full"
            >
              <Filter size={18} className="inline mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <div className="card-luxury group cursor-pointer h-full">
                      <div className="relative mb-4 overflow-hidden rounded-lg bg-luxury-100 aspect-square flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                        {product.image}
                        {product.originalPrice && (
                          <div className="absolute top-4 right-4 bg-accent-rose text-white px-3 py-1 rounded-full text-sm font-bold">
                            Sale
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-accent-charcoal">
                          ₭{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-luxury-500 line-through">
                            ₭{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                        <span className="text-accent-gold font-semibold">★★★★★</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-luxury-600 text-lg">No products found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
