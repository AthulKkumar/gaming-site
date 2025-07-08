import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './HomePage.css'

const HomePage = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Gaming Centre
          </h1>
          <p className="hero-subtitle">
            Challenge yourself with exciting games and compete with players worldwide!
          </p>
          
          {isAuthenticated ? (
            <div className="welcome-user">
              <h2 className="welcome-message">
                Welcome back, {user?.username}! 🎮
              </h2>
              <div className="user-stats">
                <div className="stat-item">
                  <span className="stat-value">💰 {user?.coins || 0}</span>
                  <span className="stat-label">Coins</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">⭐ {user?.level || 1}</span>
                  <span className="stat-label">Level</span>
                </div>
              </div>
              <Link to="/games" className="cta-button">
                Play Games
              </Link>
            </div>
          ) : (
            <div className="guest-section">
              <p className="guest-message">
                Start playing now or create an account to save your progress and earn coins!
              </p>
              <div className="cta-buttons">
                <Link to="/games" className="cta-button secondary">
                  Play as Guest
                </Link>
                <Link to="/login" className="cta-button">
                  Login / Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2 className="features-title">Why Choose Gaming Centre?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Multiple Games</h3>
            <p>Enjoy a variety of engaging games including Snake, Memory, Word Scrambler, and Tic Tac Toe.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Compete & Win</h3>
            <p>Climb the leaderboards, earn coins, and showcase your gaming skills to the world.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Earn Rewards</h3>
            <p>Play games to earn coins and unlock new challenges as you level up.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Join Community</h3>
            <p>Connect with other gamers and compete in a friendly, competitive environment.</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2 className="stats-title">Ready to Start Gaming?</h2>
        <div className="game-preview">
          <div className="game-preview-card">
            <h3>🎮 4 Exciting Games</h3>
            <p>Each with unique challenges and rewards</p>
          </div>
          <div className="game-preview-card">
            <h3>🌟 Level System</h3>
            <p>Unlock advanced games as you progress</p>
          </div>
          <div className="game-preview-card">
            <h3>🏅 Global Leaderboards</h3>
            <p>See how you rank against other players</p>
          </div>
        </div>
        <Link to="/games" className="cta-button large">
          Start Playing Now
        </Link>
      </div>
    </div>
  )
}

export default HomePage 