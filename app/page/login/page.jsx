"use client";
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import './auth.css';
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <div className="container">
      <div className="background"></div>

      <div className="card">
        
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="back-btn"
        >
          ← Back
        </button>

        <div className="logo">
          DOME
        </div>

        <form className="form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="input"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            required
          />

          {isLogin && (
            <div className="options">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="switch">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="switch-link"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}
