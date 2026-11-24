import { useState, useEffect } from 'react';
import axios from 'axios';
import type { VideoContract } from '../contracts/videosContracts';

// Sample fallback videos if server (port 6060) is not running
const FALLBACK_VIDEOS: VideoContract[] = [
  {
    video_id: 1,
    title: 'React 19 Complete Crash Course for Beginners',
    description: 'Learn modern React with Hooks, State management, Components, and Vite.',
    url: 'https://www.youtube.com/embed/SqcY0GlETPk',
    likes: 1240,
    views: 45000,
    comments: 'Super helpful!',
    category_id: 1,
  },
  {
    video_id: 2,
    title: 'JavaScript ES6+ Masterclass',
    description: 'Deep dive into closures, promises, async/await, and event loops.',
    url: 'https://www.youtube.com/embed/W6NZfCO5SIk',
    likes: 890,
    views: 32000,
    comments: 'Great explanation!',
    category_id: 2,
  },
  {
    video_id: 3,
    title: 'Node.js & Express REST API Full Guide',
    description: 'Build robust backend APIs with MongoDB, JWT, and Express.',
    url: 'https://www.youtube.com/embed/Oe421EPjeBE',
    likes: 670,
    views: 18500,
    comments: 'Very clear code.',
    category_id: 3,
  },
  {
    video_id: 4,
    title: 'Bootstrap 5 Responsive UI Design',
    description: 'Master grid systems, flexbox utilities, and modern cards.',
    url: 'https://www.youtube.com/embed/4sosXZsdy-s',
    likes: 950,
    views: 28000,
    comments: 'Love the styling.',
    category_id: 4,
  },
];

const Videos = () => {
  const [videos, setVideos] = useState<VideoContract[]>(FALLBACK_VIDEOS);
  const [filterText, setFilterText] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoContract | null>(null);

  useEffect(() => {
    // Try to load real videos from the backend if it is running
    axios
      .get('http://127.0.0.1:6060/videos')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setVideos(res.data);
        }
      })
      .catch(() => {
        // Fallback to sample data gracefully
        console.log('Using sample fallback videos');
      });
  }, []);

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(filterText.toLowerCase()) ||
    v.description.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container py-4">
      {/* Top Banner */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Explore Videos</h2>
          <p className="text-muted mb-0">Browse tutorials, courses, and guides</p>
        </div>
        <div style={{ maxWidth: '300px', width: '100%' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Filter videos here..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="row g-4">
        {filteredVideos.map((item) => (
          <div key={item.video_id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="ratio ratio-16x9 bg-dark">
                <iframe
                  src={item.url}
                  title={item.title}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-truncate" title={item.title}>
                  {item.title}
                </h5>
                <p className="card-text text-muted small flex-grow-1">
                  {item.description}
                </p>
                <div className="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
                  <span>
                    <i className="bi bi-eye-fill me-1 text-primary"></i>
                    {item.views.toLocaleString()} views
                  </span>
                  <span>
                    <i className="bi bi-hand-thumbs-up-fill me-1 text-danger"></i>
                    {item.likes} likes
                  </span>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setSelectedVideo(item)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Details */}
      {selectedVideo && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{selectedVideo.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedVideo(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedVideo.description}</p>
                <ul className="list-group list-group-flush small">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Views</span>
                    <strong>{selectedVideo.views}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Likes</span>
                    <strong>{selectedVideo.likes}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Comments</span>
                    <span>{selectedVideo.comments || 'No comments yet'}</span>
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedVideo(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
