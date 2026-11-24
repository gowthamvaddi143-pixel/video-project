import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-7">
          <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-4 mb-3"
                style={{ width: '64px', height: '64px', fontSize: '2rem' }}
              >
                <i className="bi bi-play-btn-fill"></i>
              </div>
              <h2 className="fw-bold">About VideoHub</h2>
              <p className="text-muted">Interactive Video Management Platform</p>
            </div>

            <p className="lead fs-6 text-secondary">
              VideoHub is a full-stack educational and video streaming platform built with <strong>React 19, TypeScript, Bootstrap 5, Express, and MongoDB</strong>.
            </p>

            <h5 className="fw-bold mt-4 mb-3">Key Features:</h5>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item px-0 d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span><strong>Interactive Fresher-Level Header:</strong> Easily customizable navigation, live search, categories chips, notifications, and dark mode toggle.</span>
              </li>
              <li className="list-group-item px-0 d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span><strong>Admin Dashboard:</strong> Add, edit, preview, and delete video records with real-time feedback.</span>
              </li>
              <li className="list-group-item px-0 d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span><strong>User Authentication:</strong> Clean login and registration interfaces using Formik & Yup.</span>
              </li>
              <li className="list-group-item px-0 d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span><strong>Responsive Design:</strong> Mobile-first layout with smooth touch navigation and collapsible drawers.</span>
              </li>
            </ul>

            <div className="d-flex gap-2 justify-content-center">
              <Link to="/videos" className="btn btn-primary px-4">
                Watch Videos
              </Link>
              <Link to="/Admin-dashboard" className="btn btn-outline-secondary px-4">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
