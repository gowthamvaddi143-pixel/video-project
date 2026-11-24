import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

export interface AppContextType {
  handleLogin: (name: string, userObj?: any) => void;
  handleLogout: () => void;
  isLoggedIn: boolean;
  userName: string;
}

function App() {
  // Authentication states (can be modified by Header or Login page)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  // Load user session from localStorage when the app opens
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setUserName(parsed.user_name || parsed.user_id || 'User');
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handler when user logs in
  const handleLogin = (name: string, userObj?: any) => {
    const displayName = name || 'User';
    setUserName(displayName);
    setIsLoggedIn(true);
    if (userObj) {
      localStorage.setItem('user', JSON.stringify(userObj));
    }
  };

  // Handler when user logs out
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName('');
    setIsLoggedIn(false);
  };

  // Handler for global search submitted in Header
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/videos?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="app-layout">
      {/* 🚀 Interactive Fresher-Level Header Component */}
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />

      {/* Main page content with outlet context for login/logout actions */}
      <main className="main-content" role="main">
        <Outlet context={{ handleLogin, handleLogout, isLoggedIn, userName }} />
      </main>
    </div>
  );
}

export default App;
