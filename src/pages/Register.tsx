import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    user_id: Yup.string()
      .min(3, 'User ID must be at least 3 characters')
      .required('User ID is required'),
    user_name: Yup.string()
      .min(2, 'Full Name must be at least 2 characters')
      .required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const registerForm = useFormik({
    initialValues: {
      user_id: '',
      user_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Send user registration data to MongoDB database (database_mern-apilication)
      axios
        .post('http://127.0.0.1:6060/add-user', {
          user_id: values.user_id,
          user_name: values.user_name,
          email: values.email,
          password: values.password,
        })
        .then(() => {
          alert(`Success! User "${values.user_name}" has been saved to MongoDB (database_mern-apilication).`);
          navigate('/login');
        })
        .catch((error) => {
          console.error('MongoDB registration error:', error);
          alert('Could not connect to MongoDB server. Please make sure the backend API is running (npm run api).');
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="home-container">
      <div className="login-card" style={{ maxWidth: '480px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-gradient">Create Account</h2>
          <p className="text-muted">Register and save details to MongoDB database</p>
        </div>

        <form onSubmit={registerForm.handleSubmit} noValidate>
          {/* User ID Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">User ID</label>
            <input
              type="text"
              name="user_id"
              className={`form-control ${registerForm.touched.user_id && registerForm.errors.user_id ? 'is-invalid' : ''}`}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.user_id}
              placeholder="e.g. rahul123"
              autoComplete="username"
            />
            {registerForm.touched.user_id && registerForm.errors.user_id && (
              <div className="invalid-feedback">{registerForm.errors.user_id}</div>
            )}
          </div>

          {/* Full Name Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="user_name"
              className={`form-control ${registerForm.touched.user_name && registerForm.errors.user_name ? 'is-invalid' : ''}`}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.user_name}
              placeholder="e.g. Rahul Sharma"
              autoComplete="name"
            />
            {registerForm.touched.user_name && registerForm.errors.user_name && (
              <div className="invalid-feedback">{registerForm.errors.user_name}</div>
            )}
          </div>

          {/* Email Address Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${registerForm.touched.email && registerForm.errors.email ? 'is-invalid' : ''}`}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.email}
              placeholder="e.g. rahul@example.com"
              autoComplete="email"
            />
            {registerForm.touched.email && registerForm.errors.email && (
              <div className="invalid-feedback">{registerForm.errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${registerForm.touched.password && registerForm.errors.password ? 'is-invalid' : ''}`}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.password}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {registerForm.touched.password && registerForm.errors.password && (
              <div className="invalid-feedback">{registerForm.errors.password}</div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${registerForm.touched.confirmPassword && registerForm.errors.confirmPassword ? 'is-invalid' : ''}`}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.confirmPassword}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {registerForm.touched.confirmPassword && registerForm.errors.confirmPassword && (
              <div className="invalid-feedback">{registerForm.errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={registerForm.isSubmitting}
          >
            {registerForm.isSubmitting ? 'Saving to MongoDB...' : 'Register to MongoDB'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-top text-center">
          <p className="text-muted mb-0">
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none fw-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
