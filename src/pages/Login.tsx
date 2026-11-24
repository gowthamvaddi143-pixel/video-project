import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import type { UserContract } from '../contracts/UserContracts';
import type { AdiminContract } from '../contracts/AdminContracts';
import type { AppContextType } from '../App';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const navigate = useNavigate();
  const context = useOutletContext<AppContextType>();

  // 1. User Login Formik
  const userForm = useFormik({
    initialValues: {
      user_id: '',
      password: '',
    },
    validationSchema: Yup.object({
      user_id: Yup.string().required('User ID or Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Connect to MongoDB: database_mern-apilication -> users collection
      axios
        .get('http://127.0.0.1:6060/users')
        .then((response) => {
          const users: UserContract[] = response.data;
          const foundUser = users.find(
            (u) =>
              (u.user_id === values.user_id || u.email === values.user_id) &&
              u.password === values.password
          );

          if (foundUser) {
            alert(`Welcome back, ${foundUser.user_name || foundUser.user_id}!`);
            const sessionData = {
              user_id: foundUser.user_id,
              user_name: foundUser.user_name,
              email: foundUser.email,
              role: 'user',
            };
            // Save to localStorage and update Header state
            localStorage.setItem('user', JSON.stringify(sessionData));
            if (context?.handleLogin) {
              context.handleLogin(foundUser.user_name || foundUser.user_id, sessionData);
            }
            navigate('/videos');
          } else {
            alert('Invalid User ID or Password. Please check your credentials in MongoDB.');
          }
        })
        .catch((err) => {
          console.error('MongoDB login error:', err);
          alert('Could not connect to MongoDB server. Please ensure the backend API is running (npm run api).');
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  // 2. Admin Login Formik
  const adminForm = useFormik({
    initialValues: {
      admin_id: '',
      password: '',
    },
    validationSchema: Yup.object({
      admin_id: Yup.string().required('Admin ID is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Connect to MongoDB: database_mern-apilication -> admin collection
      axios
        .get('http://127.0.0.1:6060/admin')
        .then((response) => {
          const admins: AdiminContract[] = response.data;
          const foundAdmin = admins.find(
            (a) => a.admin_id === values.admin_id && a.password === values.password
          );

          if (foundAdmin) {
            alert(`Admin Login successful: ${foundAdmin.admin_id}`);
            const adminSession = {
              user_id: foundAdmin.admin_id,
              user_name: foundAdmin.admin_id,
              role: 'admin',
            };
            localStorage.setItem('user', JSON.stringify(adminSession));
            if (context?.handleLogin) {
              context.handleLogin(foundAdmin.admin_id, adminSession);
            }
            navigate('/Admin-dashboard');
          } else {
            alert('Invalid Admin ID or Password!');
          }
        })
        .catch((err) => {
          console.error('MongoDB Admin Login error:', err);
          alert('Could not connect to MongoDB server. Please ensure the backend API is running (npm run api).');
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="home-container">
      <div className="login-card" style={{ maxWidth: '440px' }}>
        <div className="text-center mb-3">
          <h2 className="fw-bold text-gradient">Login Portal</h2>
          <p className="text-muted small">Access your account via MongoDB database</p>
        </div>

        {/* Tab Switcher: User vs Admin */}
        <ul className="nav nav-pills nav-fill mb-4 p-1 bg-light rounded-pill">
          <li className="nav-item">
            <button
              className={`nav-link rounded-pill py-2 fw-semibold ${activeTab === 'user' ? 'active' : ''}`}
              onClick={() => setActiveTab('user')}
              type="button"
            >
              <i className="bi bi-person-fill me-1"></i>User Login
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link rounded-pill py-2 fw-semibold ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
              type="button"
            >
              <i className="bi bi-shield-lock-fill me-1"></i>Admin Login
            </button>
          </li>
        </ul>

        {/* 1. USER LOGIN TAB */}
        {activeTab === 'user' && (
          <form onSubmit={userForm.handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">User ID or Email</label>
              <input
                type="text"
                name="user_id"
                className={`form-control ${userForm.touched.user_id && userForm.errors.user_id ? 'is-invalid' : ''}`}
                onChange={userForm.handleChange}
                onBlur={userForm.handleBlur}
                value={userForm.values.user_id}
                placeholder="Enter your user_id or email"
              />
              {userForm.touched.user_id && userForm.errors.user_id && (
                <div className="invalid-feedback">{userForm.errors.user_id}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${userForm.touched.password && userForm.errors.password ? 'is-invalid' : ''}`}
                onChange={userForm.handleChange}
                onBlur={userForm.handleBlur}
                value={userForm.values.password}
                placeholder="••••••••"
              />
              {userForm.touched.password && userForm.errors.password && (
                <div className="invalid-feedback">{userForm.errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={userForm.isSubmitting}
            >
              {userForm.isSubmitting ? 'Checking MongoDB...' : 'User Login'}
            </button>
          </form>
        )}

        {/* 2. ADMIN LOGIN TAB */}
        {activeTab === 'admin' && (
          <form onSubmit={adminForm.handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">Admin ID</label>
              <input
                type="text"
                name="admin_id"
                className={`form-control ${adminForm.touched.admin_id && adminForm.errors.admin_id ? 'is-invalid' : ''}`}
                onChange={adminForm.handleChange}
                onBlur={adminForm.handleBlur}
                value={adminForm.values.admin_id}
                placeholder="Enter Admin ID"
              />
              {adminForm.touched.admin_id && adminForm.errors.admin_id && (
                <div className="invalid-feedback">{adminForm.errors.admin_id}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Admin Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${adminForm.touched.password && adminForm.errors.password ? 'is-invalid' : ''}`}
                onChange={adminForm.handleChange}
                onBlur={adminForm.handleBlur}
                value={adminForm.values.password}
                placeholder="••••••••"
              />
              {adminForm.touched.password && adminForm.errors.password && (
                <div className="invalid-feedback">{adminForm.errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 py-2 fw-semibold text-dark"
              disabled={adminForm.isSubmitting}
            >
              {adminForm.isSubmitting ? 'Verifying Admin...' : 'Admin Login'}
            </button>
          </form>
        )}

        {/* Footer links */}
        <div className="mt-4 pt-3 border-top text-center">
          <p className="text-muted mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none fw-semibold">
              Register New User
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
