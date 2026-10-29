import React, { useState } from 'react';
import { UserIcon } from '../components/Icons';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

export function RegisterPage({ onRegistrationSuccess }) {
  const { setUser } = useUser();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    department: 'Computer Science & Engineering',
    password: '',
    confirmPassword: ''
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

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // Validate Email
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid college email is required';
    }

    /**
     * BUG-05 INTENTIONAL BUG:
     * Missing Registration Validation:
     * 1. No password minimum length check (allows empty or 1-character password).
     * 2. No password confirmation check (formData.password !== formData.confirmPassword is ignored!).
     * Users can register with password '1' and confirmPassword 'abc' without receiving any validation error.
     */
    // Notice: Missing:
    // if (formData.password.length < 8) newErrors.password = 'Must be at least 8 characters';
    // if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('Please correct form validation errors', 'error');
      return;
    }

    // Successfully register user despite missing password validations
    const newUser = {
      name: formData.fullName,
      email: formData.email,
      role: 'Registered Competitor',
      studentId: formData.studentId || 'CS-2024-PENDING',
      department: formData.department,
      avatarInitials: formData.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      phone: '+1 555-0100',
      address: 'Campus Dormitory'
    };

    setUser(newUser);
    localStorage.setItem('shopsphere_user', JSON.stringify(newUser));
    addToast('Account registered successfully! Welcome to ShopSphere.', 'success');

    if (onRegistrationSuccess) {
      onRegistrationSuccess();
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-circle">
            <UserIcon size={24} />
          </div>
          <h2 className="auth-title">Create Competitor Account</h2>
          <p className="auth-subtitle">
            Register to save orders, participate in the Bug Hunt Arena, and access student perks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="reg-name">Full Name *</label>
            <input
              id="reg-name"
              name="fullName"
              type="text"
              placeholder="e.g. Jordan Lee"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-input ${errors.fullName ? 'input-error' : ''}`}
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="reg-email">College Email Address *</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="e.g. jordan.lee@campus.edu"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-row-2">
            {/* Student ID */}
            <div className="form-group">
              <label htmlFor="reg-id">Student ID Roll No.</label>
              <input
                id="reg-id"
                name="studentId"
                type="text"
                placeholder="e.g. CS-2024-9102"
                value={formData.studentId}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="reg-dept">Academic Department</label>
              <select
                id="reg-dept"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Computer Science & Engineering">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics</option>
                <option value="Mechanical Engineering">Mechanical</option>
              </select>
            </div>
          </div>

          {/* Password fields - BUG-05 missing validation */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="reg-pass">Password</label>
              <input
                id="reg-pass"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-cpass">Confirm Password</label>
              <input
                id="reg-cpass"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary-gradient btn-lg btn-block">
            Register for Bug Hunt Arena
          </button>
        </form>
      </div>
    </div>
  );
}
