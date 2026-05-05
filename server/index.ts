import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initializeDatabase } from './db/init.js';
import sqlite3 from 'sqlite3';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

let db: sqlite3.Database;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist/client')));

// Types
interface AuthRequest extends Request {
  userId?: string;
}

// Initialize database
async function startServer() {
  try {
    db = await initializeDatabase();
    console.log('✓ Database initialized');

    // ==================== AUTH ROUTES ====================
    
    // Register
    app.post('/api/auth/register', (req: Request, res: Response) => {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const userId = uuidv4();

      db.run(
        'INSERT INTO users (id, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?)',
        [userId, email, hashedPassword, firstName, lastName],
        (err) => {
          if (err) {
            return res.status(400).json({ error: 'Email already exists' });
          }
          res.json({ message: 'User registered successfully', userId });
        }
      );
    });

    // Login
    app.post('/api/auth/login', (req: Request, res: Response) => {
      const { email, password } = req.body;

      db.get('SELECT * FROM users WHERE email = ?', [email], (err, user: any) => {
        if (err || !user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
          expiresIn: '7d',
        });

        res.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName } });
      });
    });

    // ==================== PRODUCT ROUTES ====================

    // Get all products
    app.get('/api/products', (req: Request, res: Response) => {
      const { category, search, limit = 20, offset = 0 } = req.query;

      let query = 'SELECT * FROM products WHERE 1=1';
      const params: any[] = [];

      if (category) {
        query += ' AND category = ?';
        params.push(category);
      }

      if (search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }

      query += ' LIMIT ? OFFSET ?';
      params.push(limit, offset);

      db.all(query, params, (err, products) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        res.json(products);
      });
    });

    // Get single product
    app.get('/api/products/:id', (req: Request, res: Response) => {
      db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, product) => {
        if (err || !product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      });
    });

    // ==================== CART ROUTES ====================

    // Get cart
    app.get('/api/cart', (req: AuthRequest, res: Response) => {
      const userId = req.headers.authorization?.split(' ')[1];
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      db.all(
        'SELECT ci.*, p.name, p.price, p.image FROM cart_items ci JOIN products p ON ci.productId = p.id WHERE ci.userId = ?',
        [userId],
        (err, items) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          res.json(items);
        }
      );
    });

    // Add to cart
    app.post('/api/cart', (req: Request, res: Response) => {
      const { userId, productId, quantity, size, color } = req.body;

      if (!userId || !productId || !quantity) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const cartItemId = uuidv4();

      db.run(
        'INSERT INTO cart_items (id, userId, productId, quantity, size, color) VALUES (?, ?, ?, ?, ?, ?)',
        [cartItemId, userId, productId, quantity, size, color],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to add to cart' });
          }
          res.json({ message: 'Added to cart', cartItemId });
        }
      );
    });

    // Remove from cart
    app.delete('/api/cart/:itemId', (req: Request, res: Response) => {
      db.run('DELETE FROM cart_items WHERE id = ?', [req.params.itemId], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to remove from cart' });
        }
        res.json({ message: 'Removed from cart' });
      });
    });

    // ==================== ORDER ROUTES ====================

    // Create order
    app.post('/api/orders', (req: Request, res: Response) => {
      const { userId, items, total, shippingAddress, paymentMethod } = req.body;

      if (!userId || !items || !total || !shippingAddress) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const orderId = uuidv4();
      const orderNumber = `ORD-${Date.now()}`;

      db.run(
        `INSERT INTO orders (id, userId, orderNumber, items, total, subtotal, shippingAddress, paymentMethod, status, paymentStatus)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [orderId, userId, orderNumber, JSON.stringify(items), total, total * 0.9, shippingAddress, paymentMethod, 'pending', 'pending'],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to create order' });
          }

          // Clear cart
          db.run('DELETE FROM cart_items WHERE userId = ?', [userId]);

          res.json({ orderId, orderNumber, message: 'Order created successfully' });
        }
      );
    });

    // Get orders
    app.get('/api/orders/:userId', (req: Request, res: Response) => {
      db.all(
        'SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC',
        [req.params.userId],
        (err, orders) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          res.json(orders);
        }
      );
    });

    // Get order details
    app.get('/api/orders/:orderId/details', (req: Request, res: Response) => {
      db.get('SELECT * FROM orders WHERE id = ?', [req.params.orderId], (err, order: any) => {
        if (err || !order) {
          return res.status(404).json({ error: 'Order not found' });
        }

        db.all(
          'SELECT * FROM order_status_history WHERE orderId = ? ORDER BY timestamp DESC',
          [req.params.orderId],
          (err, history) => {
            res.json({ ...order, history });
          }
        );
      });
    });

    // ==================== CONTACT ROUTES ====================

    // Submit contact form
    app.post('/api/contact', (req: Request, res: Response) => {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const messageId = uuidv4();

      db.run(
        'INSERT INTO contact_messages (id, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)',
        [messageId, name, email, phone, subject, message],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to send message' });
          }
          res.json({ message: 'Message sent successfully' });
        }
      );
    });

    // ==================== STATIC FILES ====================

    // Serve React app
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../dist/client/index.html'));
    });

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
