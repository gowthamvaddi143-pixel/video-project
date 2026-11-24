import { Link } from 'react-router-dom';

const Profile = () => {
  const userName = 'John Doe';
  const userEmail = 'john@example.com';
  const joinDate = 'January 2024';

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5 text-center">
              <div className="user-avatar mx-auto mb-3" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                {userName.charAt(0)}
              </div>
              <h2 className="fw-bold mb-1">{userName}</h2>
              <p className="text-muted mb-1">{userEmail}</p>
              <p className="text-muted small">Member since {joinDate}</p>

              <div className="mt-4 pt-4 border-top">
                <Link to="/settings" className="btn btn-outline-primary">
                  <svg width="16" height="16" className="me-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mt-4">
            <div className="card-header bg-white border-0">
              <h5 className="fw-semibold mb-0">Activity Summary</h5>
            </div>
            <div className="card-body">
              <div className="row g-3 text-center">
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <div className="fw-bold fs-3 text-primary">0</div>
                    <div className="text-muted small">Videos</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <div className="fw-bold fs-3 text-success">0</div>
                    <div className="text-muted small">Likes</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <div className="fw-bold fs-3 text-info">0</div>
                    <div className="text-muted small">Views</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;