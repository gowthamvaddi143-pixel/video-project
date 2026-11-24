import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="login-card text-center">
        <div className="mb-4">
          <div className="logo-icon mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="currentColor"/>
              <path d="M8 8l8 4-8 4V8z" fill="white"/>
            </svg>
          </div>
          <h1 className="fw-bold text-gradient mb-2" style={{ fontSize: '2.5rem' }}>VideoHub</h1>
          <p className="text-muted fs-5">Your personal video platform</p>
        </div>

        <div className="d-grid gap-2">
          <Link to="/login" className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link to="/register" className="btn btn-outline-primary btn-lg">
            Create Account
          </Link>
        </div>

        <div className="mt-4 pt-4 border-top">
          <p className="text-muted small mb-0">
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none fw-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;