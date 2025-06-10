import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useMutation } from '@apollo/client';
import { LOGIN_USER_ALT } from './graphql/mutations';

function Login() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginUser] = useMutation(LOGIN_USER_ALT);
//runs everytime when user tyoes in the form,also updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();//stops reloading
    setError('');
    if (!formData.identifier || !formData.password) {
      setError('Please enter both username/email and password');
      return;
    }

    setLoading(true);

    try {
      const { data } = await loginUser({
      variables: {
      input: {
      identifier: formData.identifier,  // username or email
      password: formData.password
    }
  }
});
      if (data?.login?.jwt) {
        const jwt = data.login.jwt;
        const user = data.login.user;
        login(user, jwt);
        localStorage.setItem('jwt_token', jwt);
        navigate('/dashboard');
      } else {
        setError('Login failed. Invalid credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4">Sign In</h2>

        {error && (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-triangle"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="identifier" className="form-label">
              Username or Email <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your username or email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account? <a href="/signup">Create one here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
