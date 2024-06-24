import React from 'react';
import './Login.css';
import companyLogo from '../assets/company-logo.png'; // Ensure you have a company logo image in the assets folder

const Login = () => {
  return (
    <div className="login-container">
      <div className="image-section">
        <img src={companyLogo} alt="Company Logo" />
      </div>
      <div className="login-section">
        <h2>Login to Your Account</h2>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
