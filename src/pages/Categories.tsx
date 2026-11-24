import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { CategoryContract } from '../contracts/categoryContracts';

const DEFAULT_CATEGORIES: CategoryContract[] = [
  { category_id: 1, category_name: 'Web Development' },
  { category_id: 2, category_name: 'React JS & Frontend' },
  { category_id: 3, category_name: 'Node.js & Backend' },
  { category_id: 4, category_name: 'UI/UX & CSS Design' },
  { category_id: 5, category_name: 'Database & MongoDB' },
  { category_id: 6, category_name: 'Cloud & DevOps' },
];

const Categories = () => {
  const [categories, setCategories] = useState<CategoryContract[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:6060/categories')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data);
        }
      })
      .catch(() => {
        // Fallback to defaults
      });
  }, []);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Video Categories</h2>
        <p className="text-muted">Explore playlists grouped by topic</p>
      </div>

      <div className="row g-3">
        {categories.map((cat, index) => (
          <div key={cat.category_id || index} className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 p-3 shadow-sm border-0 rounded-4 text-center">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center text-primary bg-primary-subtle rounded-circle"
                style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}
              >
                <i className="bi bi-folder-fill"></i>
              </div>
              <h5 className="fw-bold text-capitalize">{cat.category_name}</h5>
              <p className="text-muted small">Curated video collections</p>
              <Link
                to="/videos"
                className="btn btn-outline-primary btn-sm rounded-pill mt-auto"
              >
                View Videos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
