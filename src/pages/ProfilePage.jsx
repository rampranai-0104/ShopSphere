import React, { useState } from 'react';
import { UserIcon } from '../components/Icons';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

export function ProfilePage({ onNavigateToRegister }) {
  const { user } = useUser();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'alex.morgan@campus.edu',
    phone: user?.phone || '+1 555-0192',
    address: user?.address || '404 Silicon Way, Hall B, Room 302',
    role: user?.role || 'Student Developer'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate email
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please provide a valid email address with @ and domain.';
    }

    // Validate phone: must contain at least 7 digits
    if (formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Phone number must have at least 7 digits.';
    }

    /**
     * BUG-07 INTENTIONAL BUG:
     * Success shown despite failed validation:
     * When validation fails (e.g. invalid email like 'notanemail'),
     * `errors` state is populated, but `handleSubmit` DOES NOT return early!
     * It still triggers the green success toast "Profile changes saved successfully!".
     * As a result, both red field errors and green success confirmation appear simultaneously.
     */
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // BUG-07: Still triggers success toast despite errors!
      addToast('Profile changes saved successfully!', 'success');
      // Notice: missing return; here!
    }

    const updatedUser = {
      ...user,
      ...formData,
      avatarInitials: formData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    };

    /**
     * BUG-08 INTENTIONAL BUG:
     * Stale localStorage UI state:
     * Saves updated user directly into localStorage:
     * `localStorage.setItem('shopsphere_user', JSON.stringify(updatedUser))`
     * but OMITS calling `setUser(updatedUser)` or updating UserContext!
     * Consequently, the Navbar profile badge and header user name remain stale
     * until the browser is manually refreshed.
     */
    localStorage.setItem('shopsphere_user', JSON.stringify(updatedUser));

    // BUG-08: Intentionally omitted:
    // setUser(updatedUser);

    if (Object.keys(newErrors).length === 0) {
      addToast('Profile changes written to localStorage!', 'info');
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <h1 className="profile-title">Competitor Profile & Settings</h1>
        <p className="profile-subtitle">
          Manage your contact credentials, shipping address, and Bug Hunt Arena registration.
        </p>
      </div>

      <div className="profile-grid">
        {/* Left: User Card */}
        <div className="profile-card-preview">
          <div className="profile-avatar-large">
            {formData.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <h2 className="preview-name">{formData.name}</h2>
          <span className="preview-role">{formData.role}</span>
          <span className="preview-email">{formData.email}</span>

          <div className="profile-meta-block">
            <div className="meta-line">
              <span className="meta-label">Student ID:</span>
              <span className="meta-val">{user?.studentId || 'CS-2024-8841'}</span>
            </div>
            <div className="meta-line">
              <span className="meta-label">Campus Hall:</span>
              <span className="meta-val">Silicon Hall B</span>
            </div>
            <div className="meta-line">
              <span className="meta-label">Sprint Status:</span>
              <span className="badge-active">Active Competitor</span>
            </div>
          </div>

          {onNavigateToRegister && (
            <button
              type="button"
              className="btn btn-outline-sm btn-block"
              style={{ marginTop: '16px' }}
              onClick={onNavigateToRegister}
            >
              Register New Account
            </button>
          )}
        </div>

        {/* Right: Profile Edit Form */}
        <div className="profile-edit-card">
          <h3 className="card-heading">Edit Profile Information</h3>

          <form onSubmit={handleSubmit} className="profile-form" noValidate>
            <div className="form-group">
              <label htmlFor="prof-name">Display Full Name</label>
              <input
                id="prof-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prof-email">Email Address</label>
              <input
                id="prof-email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="prof-phone">Contact Phone Number</label>
              <input
                id="prof-phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="prof-address">Default Campus Delivery Address</label>
              <input
                id="prof-address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <button type="submit" className="btn btn-primary-gradient btn-lg">
              Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
