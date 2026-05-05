# Deployment Guide - Activewear Pro E-Commerce Platform

## 🚀 Deployment Options

### Option 1: Manus Platform (Recommended)
The easiest way to deploy your Activewear Pro website with built-in hosting, SSL, and custom domains.

**Steps:**
1. Upload project to Manus
2. Configure environment variables
3. Click "Publish" button
4. Add custom domain (optional)

**Benefits:**
- Automatic SSL certificates
- CDN for fast loading
- Built-in analytics
- One-click rollbacks
- No server management

### Option 2: Railway
Deploy Node.js + SQLite stack easily.

**Steps:**
1. Push code to GitHub
2. Connect Railway to GitHub repository
3. Set environment variables
4. Deploy

**Environment Variables:**
```
NODE_ENV=production
PORT=3000
DATABASE_URL=/data/activewear.db
JWT_SECRET=your-secret-key
```

### Option 3: Render
Similar to Railway with good free tier.

**Steps:**
1. Create Render account
2. Connect GitHub
3. Create Web Service
4. Set build command: `npm run build`
5. Set start command: `npm start`

### Option 4: Self-Hosted (VPS)
Deploy on your own server (AWS, DigitalOcean, Linode, etc.)

**Requirements:**
- Node.js 16+
- PM2 or similar process manager
- Nginx reverse proxy
- SSL certificate (Let's Encrypt)
- Database backup strategy

**Setup Steps:**
```bash
# SSH into your server
ssh user@your-server.com

# Clone repository
git clone your-repo-url
cd activewear_pro

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start "npm start" --name "activewear-pro"
pm2 startup
pm2 save
```

## 📋 Pre-Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Test all payment methods
- [ ] Verify SSL certificate
- [ ] Test order tracking
- [ ] Verify email notifications
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Backup database
- [ ] Setup monitoring/alerts
- [ ] Configure CDN for images
- [ ] Setup error logging
- [ ] Test contact form
- [ ] Verify all links work
- [ ] Test checkout flow end-to-end

## 🔧 Environment Configuration

### Production `.env`
```
NODE_ENV=production
PORT=3000
DATABASE_URL=/data/activewear.db

# Security
JWT_SECRET=your-very-secure-secret-key-change-this

# Payment
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Business
BUSINESS_NAME=Activewear Pro
BUSINESS_EMAIL=info@activewearpro.com
BUSINESS_PHONE=+95 9 123 456 789
BUSINESS_ADDRESS=Yangon, Myanmar
FACEBOOK_PAGE=https://www.facebook.com/activewearpro2020
```

## 🔐 Security Recommendations

1. **HTTPS Only**
   - Force HTTPS redirects
   - Use HSTS headers
   - Enable SSL/TLS

2. **Database Security**
   - Regular backups (daily)
   - Encrypted backups
   - Restricted access
   - SQL injection prevention

3. **Payment Security**
   - PCI DSS compliance
   - Never store full card numbers
   - Use Stripe tokenization
   - Secure API keys

4. **Application Security**
   - Keep dependencies updated
   - Regular security audits
   - Rate limiting
   - CORS configuration
   - Input validation

5. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Uptime monitoring
   - Log aggregation

## 📊 Performance Optimization

1. **Image Optimization**
   - Use WebP format
   - Compress images
   - Lazy loading
   - CDN delivery

2. **Code Optimization**
   - Minify CSS/JS
   - Code splitting
   - Tree shaking
   - Gzip compression

3. **Caching**
   - Browser caching
   - Server-side caching
   - Redis for sessions
   - CDN caching

4. **Database**
   - Indexing
   - Query optimization
   - Connection pooling
   - Regular maintenance

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - run: npm test
      - name: Deploy
        run: |
          # Your deployment script here
```

## 📈 Monitoring & Analytics

### Key Metrics to Track
- Page load time
- Conversion rate
- Cart abandonment rate
- Error rate
- Server uptime
- User sessions
- Revenue

### Tools
- Google Analytics
- Sentry (error tracking)
- New Relic (performance)
- Datadog (infrastructure)
- Hotjar (user behavior)

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check database file exists
ls -la data/activewear.db

# Reinitialize if needed
npm run db:init
```

**Port Already in Use**
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

**Out of Memory**
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

**SSL Certificate Issues**
```bash
# Renew Let's Encrypt certificate
sudo certbot renew --force-renewal
```

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- Weekly: Monitor logs and errors
- Monthly: Security updates
- Quarterly: Performance review
- Annually: Full security audit

### Backup Strategy
- Daily automated backups
- Weekly off-site backups
- Monthly archive backups
- Test restore procedures

## 🎯 Post-Deployment

1. **Monitor Performance**
   - Check load times
   - Monitor error rates
   - Track user behavior

2. **Gather Feedback**
   - User surveys
   - Support tickets
   - Analytics review

3. **Iterate & Improve**
   - Fix bugs quickly
   - Optimize performance
   - Add requested features

4. **Scale as Needed**
   - Upgrade server resources
   - Implement caching
   - Database optimization
   - Load balancing

## 📞 Emergency Contacts

- **Technical Support**: tech@activewearpro.com
- **Business**: info@activewearpro.com
- **Phone**: +95 9 123 456 789

---

**Last Updated**: May 2026
**Version**: 1.0.0
