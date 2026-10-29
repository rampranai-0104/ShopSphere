import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export function ContactPage() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@campus.edu',
    category: 'Bug Report / Feedback',
    subject: '',
    message: ''
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopsphere_contact_submissions') || '[]');
    } catch {
      return [];
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * BUG-06 INTENTIONAL BUG:
   * Duplicate contact submission:
   * 1. No debounce or submission throttling.
   * 2. Submit button is never disabled during submission.
   * Double clicking or clicking multiple times rapidly records duplicate ticket entries
   * and fires duplicate toast notifications for every click.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim()) {
      addToast('Please fill out both subject and message', 'warning');
      return;
    }

    // BUG-06: Rapid clicks append duplicate items with separate timestamps/IDs
    const newSubmission = {
      id: `TICK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: formData.name,
      email: formData.email,
      category: formData.category,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toLocaleTimeString()
    };

    const updated = [...submissions, newSubmission];
    setSubmissions(updated);
    localStorage.setItem('shopsphere_contact_submissions', JSON.stringify(updated));

    // Notice: Multiple rapid clicks fire multiple toasts
    addToast(`Inquiry dispatched successfully! (Ticket ID: ${newSubmission.id})`, 'success');
  };

  const handleClearHistory = () => {
    localStorage.removeItem('shopsphere_contact_submissions');
    setSubmissions([]);
    addToast('Submissions log cleared', 'info');
  };

  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact Support & Bug Hunt Inquiries</h1>
        <p className="contact-subtitle">
          Have an inquiry, order issue, or want to report test environment behavior? Reach out directly.
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Form */}
        <div className="contact-form-card">
          <h2 className="card-heading">Submit Support Ticket</h2>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-cat">Inquiry Category</label>
              <select
                id="contact-cat"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Bug Report / Feedback">Bug Report / Arena Feedback</option>
                <option value="Order Tracking">Order Fulfillment & Delivery</option>
                <option value="Product Inquiry">Product Specs Inquiry</option>
                <option value="General Support">General Support</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-sub">Subject *</label>
              <input
                id="contact-sub"
                name="subject"
                type="text"
                placeholder="Brief summary of inquiry"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-msg">Message *</label>
              <textarea
                id="contact-msg"
                name="message"
                rows="4"
                placeholder="Provide detailed information..."
                value={formData.message}
                onChange={handleChange}
                className="form-input"
                required
              ></textarea>
            </div>

            {/* BUG-06: Button lacks disabled={isSubmitting} */}
            <button
              type="submit"
              className="btn btn-primary-gradient btn-lg btn-submit-contact"
            >
              Send Support Message
            </button>
          </form>
        </div>

        {/* Live Submissions Log */}
        <div className="contact-submissions-card">
          <div className="submissions-header">
            <h3>Dispatched Inquiries Log ({submissions.length})</h3>
            {submissions.length > 0 && (
              <button onClick={handleClearHistory} className="btn btn-sm btn-outline-danger">
                Clear Log
              </button>
            )}
          </div>
          <p className="submissions-note">
            Each received submission is logged below in local state and localStorage.
          </p>

          <div className="submissions-list">
            {submissions.length === 0 ? (
              <div className="empty-submissions">
                <span>No support tickets dispatched yet.</span>
              </div>
            ) : (
              submissions.map((sub) => (
                <div key={sub.id} className="submission-item">
                  <div className="submission-meta">
                    <span className="sub-id">{sub.id}</span>
                    <span className="sub-time">{sub.timestamp}</span>
                  </div>
                  <h4 className="sub-subject">{sub.subject}</h4>
                  <p className="sub-msg">{sub.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
