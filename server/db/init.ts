import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../data/activewear.db');

export function initializeDatabase() {
  return new Promise<sqlite3.Database>((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Enable foreign keys
      db.run('PRAGMA foreign_keys = ON', (err) => {
        if (err) {
          reject(err);
          return;
        }

        // Create tables
        db.serialize(() => {
          // Users table
          db.run(`
            CREATE TABLE IF NOT EXISTS users (
              id TEXT PRIMARY KEY,
              email TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              firstName TEXT,
              lastName TEXT,
              phone TEXT,
              address TEXT,
              city TEXT,
              postalCode TEXT,
              country TEXT DEFAULT 'Myanmar',
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);

          // Products table
          db.run(`
            CREATE TABLE IF NOT EXISTS products (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              description TEXT,
              category TEXT NOT NULL,
              price REAL NOT NULL,
              originalPrice REAL,
              image TEXT,
              images TEXT,
              sizes TEXT,
              colors TEXT,
              material TEXT,
              care TEXT,
              stock INTEGER DEFAULT 0,
              sku TEXT UNIQUE,
              featured BOOLEAN DEFAULT 0,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);

          // Cart items table
          db.run(`
            CREATE TABLE IF NOT EXISTS cart_items (
              id TEXT PRIMARY KEY,
              userId TEXT NOT NULL,
              productId TEXT NOT NULL,
              quantity INTEGER NOT NULL,
              size TEXT,
              color TEXT,
              addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
              FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
            )
          `);

          // Orders table
          db.run(`
            CREATE TABLE IF NOT EXISTS orders (
              id TEXT PRIMARY KEY,
              userId TEXT NOT NULL,
              orderNumber TEXT UNIQUE NOT NULL,
              items TEXT NOT NULL,
              subtotal REAL NOT NULL,
              tax REAL DEFAULT 0,
              shippingCost REAL DEFAULT 0,
              total REAL NOT NULL,
              status TEXT DEFAULT 'pending',
              paymentStatus TEXT DEFAULT 'pending',
              paymentMethod TEXT,
              stripePaymentIntentId TEXT,
              shippingAddress TEXT NOT NULL,
              billingAddress TEXT,
              notes TEXT,
              trackingNumber TEXT,
              estimatedDelivery DATE,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
          `);

          // Order status history table
          db.run(`
            CREATE TABLE IF NOT EXISTS order_status_history (
              id TEXT PRIMARY KEY,
              orderId TEXT NOT NULL,
              status TEXT NOT NULL,
              message TEXT,
              timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
            )
          `);

          // Reviews table
          db.run(`
            CREATE TABLE IF NOT EXISTS reviews (
              id TEXT PRIMARY KEY,
              productId TEXT NOT NULL,
              userId TEXT NOT NULL,
              rating INTEGER NOT NULL,
              title TEXT,
              comment TEXT,
              verified BOOLEAN DEFAULT 0,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
              FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
          `);

          // Wishlist table
          db.run(`
            CREATE TABLE IF NOT EXISTS wishlist (
              id TEXT PRIMARY KEY,
              userId TEXT NOT NULL,
              productId TEXT NOT NULL,
              addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
              FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
            )
          `);

          // Coupons table
          db.run(`
            CREATE TABLE IF NOT EXISTS coupons (
              id TEXT PRIMARY KEY,
              code TEXT UNIQUE NOT NULL,
              discountType TEXT,
              discountValue REAL NOT NULL,
              minPurchase REAL DEFAULT 0,
              maxUses INTEGER,
              usedCount INTEGER DEFAULT 0,
              expiryDate DATE,
              active BOOLEAN DEFAULT 1,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);

          // Contact messages table
          db.run(`
            CREATE TABLE IF NOT EXISTS contact_messages (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT NOT NULL,
              phone TEXT,
              subject TEXT NOT NULL,
              message TEXT NOT NULL,
              status TEXT DEFAULT 'unread',
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(db);
            }
          });
        });
      });
    });
  });
}

export function getDatabase(): sqlite3.Database {
  return new sqlite3.Database(dbPath);
}
