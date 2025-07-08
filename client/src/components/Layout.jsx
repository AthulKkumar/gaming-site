import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import './Layout.css'

const Layout = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/">GAMEIFICATION</Link>
          </div>

          <div className="nav-menu">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/games" 
                  className={`nav-link ${isActive('/games') ? 'active' : ''}`}
                >
                  Games
                </Link>
                <Link 
                  to="/leaderboard" 
                  className={`nav-link ${isActive('/leaderboard') ? 'active' : ''}`}
                >
                  Leaderboard
                </Link>
                
                <div className="user-dropdown">
                  <button 
                    className="user-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <span>{user?.username}</span>
                    <span className="user-coins">💰 {user?.coins || 0}</span>
                    <span className="dropdown-arrow">▼</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="dropdown-menu">
                      <Link 
                        to="/account" 
                        className="dropdown-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Account
                      </Link>
                      <button 
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/games" 
                  className={`nav-link ${isActive('/games') ? 'active' : ''}`}
                >
                  Games
                </Link>
                <Link 
                  to="/leaderboard" 
                  className={`nav-link ${isActive('/leaderboard') ? 'active' : ''}`}
                >
                  Leaderboard
                </Link>
                <button 
                  className="nav-link login-btn"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  )
}

export default Layout 