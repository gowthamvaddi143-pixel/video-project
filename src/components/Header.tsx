import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

/**
 * ============================================================================
 * 🎓 FRESHER CUSTOMIZATION CONFIGURATION (CHANGE THESE EASILY!)
 * ============================================================================
 * You can customize the entire Header by simply changing the values below.
 * No need to touch complex React code!
 */

// 1. Brand / Logo Settings
export const APP_CONFIG = {
  appName: 'VideoTube',
  appBadge: 'Pro',
  tagline: 'Learn, Watch & Share',
};

// 2. Navigation Items (Add or edit links here)
export const NAV_LINKS = [
  { label: 'Home', path: '/', icon: 'bi-house-door-fill' },
  { label: 'Videos', path: '/videos', icon: 'bi-play-circle-fill' },
  { label: 'Categories', path: '/categories', icon: 'bi-grid-fill' },
  { label: 'Admin Panel', path: '/Admin-dashboard', icon: 'bi-speedometer2' },
];

// 3. Quick Video Categories (Displayed in the sub-header chips bar)
export const DEFAULT_CATEGORIES = [
  'All',
  'Web Development',
  'React JS',
  'Node.js',
  'JavaScript',
  'Python',
  'Full Stack',
  'UI/UX Design',
];

/**
 * TypeScript Props definition
 * Allows parent components (like App.tsx) to pass custom user data or callbacks
 */
export interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
  onLogin?: (name: string) => void;
  onSearch?: (query: string) => void;
  onCategorySelect?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLoggedIn: externalIsLoggedIn,
  userName: externalUserName,
  onLogout,
  onLogin: _onLogin,
  onSearch,
  onCategorySelect,
}) => {
  // --------------------------------------------------------------------------
  // 🌟 REACT STATE HOOKS (INTERACTIVE FEATURES)
  // --------------------------------------------------------------------------
  const [internalLoggedIn, setInternalLoggedIn] = useState<boolean>(
    externalIsLoggedIn ?? false
  );
  const [internalUserName, setInternalUserName] = useState<string>(
    externalUserName || 'John Doe'
  );

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dropdown toggles
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Scroll effect state
  const [isScrolled, setIsScrolled] = useState(false);

  // Routing hooks
  const location = useLocation();
  const navigate = useNavigate();

  // DOM Ref for handling outside click on user menu
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Sync internal state with props if provided
  useEffect(() => {
    if (externalIsLoggedIn !== undefined) {
      setInternalLoggedIn(externalIsLoggedIn);
    }
  }, [externalIsLoggedIn]);

  useEffect(() => {
    if (externalUserName) {
      setInternalUserName(externalUserName);
    }
  }, [externalUserName]);

  // --------------------------------------------------------------------------
  // 📜 SCROLL & OUTSIDE CLICK LISTENERS
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Adds a nice shadow when user scrolls down
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    // Closes open dropdown when clicking anywhere outside
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    };

    // Close menus with ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // --------------------------------------------------------------------------
  // 🎯 EVENT HANDLERS (INTERACTIVITY)
  // --------------------------------------------------------------------------

  // Search submit handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      if (searchQuery.trim()) {
        navigate(`/videos?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) onSearch('');
  };

  // Category chip clicked
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  // Logout handler
  const handleUserLogout = () => {
    setInternalLoggedIn(false);
    setIsUserMenuOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      alert('You have logged out successfully.');
      navigate('/');
    }
  };

  return (
    <header className={`custom-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* ================================================================== */}
      {/* 🚀 TOP MAIN NAVIGATION BAR */}
      {/* ================================================================== */}
      <div className="container-fluid px-3 px-md-4 py-2">
        <div className="d-flex align-items-center justify-content-between gap-2 gap-md-3">
          
          {/* 1. BRAND LOGO & TITLE */}
          <div className="d-flex align-items-center gap-2">
            {/* Mobile Hamburger Button */}
            <button
              className="hamburger-toggle-btn d-lg-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>

            <Link to="/" className="brand-link">
              <div className="brand-icon-box">
                <i className="bi bi-play-btn-fill"></i>
              </div>
              <div className="d-none d-sm-block">
                <div className="d-flex align-items-center">
                  <span className="brand-text-title">{APP_CONFIG.appName}</span>
                  <span className="brand-text-badge">{APP_CONFIG.appBadge}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* 2. SEARCH BAR (CENTER) */}
          <div className="search-container d-none d-md-block flex-grow-1 mx-3">
            <form onSubmit={handleSearchSubmit} className="search-input-group">
              <i className="bi bi-search search-icon-left"></i>
              <input
                type="text"
                className="custom-search-input"
                placeholder="Search videos, tutorials, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={handleClearSearch}
                  title="Clear search"
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </form>
          </div>

          {/* 3. DESKTOP NAVIGATION LINKS */}
          <nav className="d-none d-lg-block">
            <ul className="header-nav-list">
              {NAV_LINKS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`header-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <i className={`bi ${item.icon}`}></i>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 4. ACTIONS: USER PROFILE OR LOGIN / SIGN UP */}
          <div className="d-flex align-items-center gap-2">
            {internalLoggedIn ? (
              <div className="position-relative" ref={userMenuRef}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  title="Account Menu"
                >
                  <div className="avatar-circle">
                    {internalUserName.charAt(0).toUpperCase()}
                  </div>
                  <span className="d-none d-md-inline fw-semibold small text-truncate" style={{ maxWidth: '100px' }}>
                    {internalUserName}
                  </span>
                  <i className="bi bi-chevron-down small d-none d-md-inline"></i>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="custom-dropdown-card" style={{ width: '220px' }}>
                    <div className="p-3 border-bottom">
                      <div className="fw-bold text-truncate">{internalUserName}</div>
                      <small className="text-muted">Creator Account</small>
                    </div>
                    <Link
                      to="/Admin-dashboard"
                      className="profile-menu-link"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <i className="bi bi-camera-video text-primary"></i>
                      <span>Manage Videos</span>
                    </Link>
                    <Link
                      to="/videos"
                      className="profile-menu-link"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <i className="bi bi-collection-play text-info"></i>
                      <span>Watch Videos</span>
                    </Link>
                    <hr className="my-1 border-secondary-subtle" />
                    <button
                      className="profile-menu-link text-danger w-100 bg-transparent border-0 text-start"
                      onClick={handleUserLogout}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-outline-primary btn-sm px-3 rounded-pill">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm px-3 rounded-pill d-none d-sm-inline-block">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar (Visible on phones below header) */}
        <div className="d-block d-md-none mt-2">
          <form onSubmit={handleSearchSubmit} className="search-input-group">
            <i className="bi bi-search search-icon-left"></i>
            <input
              type="text"
              className="custom-search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={handleClearSearch}
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </form>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 🏷️ CATEGORY CHIPS BAR (SUB-HEADER) */}
      {/* ================================================================== */}
      <div className="sub-header-categories">
        {DEFAULT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ================================================================== */}
      {/* 📱 MOBILE RESPONSIVE DRAWER (Collapsible on mobile) */}
      {/* ================================================================== */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer d-lg-none">
          <ul className="list-unstyled mb-3">
            {NAV_LINKS.map((item) => (
              <li key={item.path} className="mb-1">
                <Link
                  to={item.path}
                  className={`header-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className={`bi ${item.icon}`}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-top pt-3">
            {!internalLoggedIn ? (
              <div className="d-grid gap-2">
                <Link
                  to="/login"
                  className="btn btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                className="btn btn-danger w-100 mt-2"
                onClick={() => {
                  handleUserLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
