'use client';

import { useState } from 'react';
import styles from './login.module.css';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glowBlob} />
      
      <div className={`${styles.loginCard} glass`}>
        <div className={styles.header}>
          <h1 className="text-gradient">Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to Injaazh Lead AI</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="admin@injaazh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className={styles.footer}>
          <p>Don't have an account? <Link href="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
}
