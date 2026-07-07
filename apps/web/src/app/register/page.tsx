'use client';

import { useState } from 'react';
import styles from '../login/login.module.css'; // Reusing login styles for consistency
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationName: '',
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await register(formData);
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glowBlob} />
      
      <div className={`${styles.loginCard} glass`}>
        <div className={styles.header}>
          <h1 className="text-gradient">Get Started</h1>
          <p className={styles.subtitle}>Create your Injaazh Lead AI account</p>
        </div>

        <form onSubmit={handleRegister} className={styles.form}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="admin@injaazh.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="organizationName">Company Name</label>
            <input
              id="organizationName"
              type="text"
              placeholder="Acme Corp"
              value={formData.organizationName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className={styles.footer}>
          <p>Already have an account? <Link href="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
