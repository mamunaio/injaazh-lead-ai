'use client';

import { useState } from 'react';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for now
    console.log('Logging in with:', { email, password });
    window.location.href = '/dashboard';
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

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>
        
        <div className={styles.footer}>
          <p>Don't have an account? <a href="#">Request Access</a></p>
        </div>
      </div>
    </div>
  );
}
