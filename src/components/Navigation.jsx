import { Link, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { getUserSavedArticles } = useArticles(); // user-specific
  const { user, logout, isAuthenticated, isAdmin } = useAuth(); // include isAdmin

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>

            {/* Only show Saved Articles if user is authenticated */}
            {isAuthenticated && (
              <Link 
                to="/saved" 
                className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
              >
                Saved Articles ({getUserSavedArticles().length})
              </Link>
            )}

            {/* Only show Admin link if user is admin */}
            {isAuthenticated && isAdmin() && (
              <Link 
                to="/admin" 
                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* Authentication section */}
        <div className="nav-user">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user.username}</span>
              <button 
                onClick={logout} 
                style={{ marginLeft: '10px' }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              style={{ marginLeft: '10px' }}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;