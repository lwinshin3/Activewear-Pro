import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-luxury-900 to-accent-charcoal text-white">
        <div className="container-luxury text-center">
          <h1 className="font-luxury text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-luxury-200 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Contact us anytime!
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="font-luxury text-2xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-rose rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-luxury-600">+95 9 123 456 789</p>
                    <p className="text-sm text-luxury-500">Available 9 AM - 6 PM (Myanmar Time)</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-rose rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-luxury-600">info@activewearpro.com</p>
                    <p className="text-sm text-luxury-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-rose rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-luxury-600">Yangon, Myanmar</p>
                    <p className="text-sm text-luxury-500">Southeast Asia</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-rose rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-luxury-600">Monday - Friday: 9 AM - 6 PM</p>
                    <p className="text-luxury-600">Saturday: 10 AM - 4 PM</p>
                    <p className="text-luxury-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-luxury-200">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/activewearpro2020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-luxury-100 rounded-full flex items-center justify-center hover:bg-accent-charcoal hover:text-white transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-luxury-100 rounded-full flex items-center justify-center hover:bg-accent-charcoal hover:text-white transition-colors"
                  >
                    📷
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-luxury">
                <h2 className="font-luxury text-2xl font-bold mb-6">Send us a Message</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="font-semibold text-lg mb-2">Message Sent Successfully!</h3>
                    <p className="text-luxury-600">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-luxury"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-luxury"
                      />
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-luxury w-full"
                    />

                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject *"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-luxury w-full"
                    />

                    <textarea
                      name="message"
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-luxury w-full resize-none"
                    ></textarea>

                    <button type="submit" className="btn-luxury w-full">
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* FAQ */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <details className="card-luxury">
                    <summary className="font-semibold cursor-pointer">What are your shipping times?</summary>
                    <p className="text-luxury-600 mt-3">
                      Standard delivery takes 3-5 business days. Express delivery is 1-2 business days.
                    </p>
                  </details>
                  <details className="card-luxury">
                    <summary className="font-semibold cursor-pointer">Do you accept returns?</summary>
                    <p className="text-luxury-600 mt-3">
                      Yes! We offer 30-day returns on all items in original condition.
                    </p>
                  </details>
                  <details className="card-luxury">
                    <summary className="font-semibold cursor-pointer">What payment methods do you accept?</summary>
                    <p className="text-luxury-600 mt-3">
                      We accept Cash on Delivery, Bank Transfer, and Credit/Debit Cards.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-padding bg-luxury-100">
        <div className="container-luxury">
          <h2 className="font-luxury text-3xl font-bold text-center mb-8">Visit Us</h2>
          <div className="bg-luxury-300 rounded-xl h-96 flex items-center justify-center text-luxury-600">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-4" />
              <p className="text-lg font-semibold">Yangon, Myanmar</p>
              <p className="text-sm">Map integration coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
