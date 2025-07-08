import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import './GameCompleteModal.css'

const GameCompleteModal = ({ 
  game, 
  score, 
  coinsEarned = 0, 
  isAuthenticated, 
  onClose, 
  onPlayAgain 
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user } = useAuth()

  const handlePlayAgain = () => {
    onClose()
    onPlayAgain()
  }

  const handleShowLogin = () => {
    setShowLoginModal(true)
  }

  return (
    <>
      <div className="game-complete-overlay" onClick={onClose}>
        <div className="game-complete-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">🎮 Game Complete!</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <div className="modal-content">
            <div className="game-info">
              <h3 className="game-name">{game}</h3>
              <div className="score-display">
                <span className="score-label">Final Score:</span>
                <span className="score-value">{score}</span>
              </div>
            </div>

            {isAuthenticated ? (
              <div className="authenticated-results">
                <div className="rewards">
                  <div className="reward-item">
                    <span className="reward-icon">💰</span>
                    <div className="reward-info">
                      <span className="reward-label">Coins Earned</span>
                      <span className="reward-value">+{coinsEarned}</span>
                    </div>
                  </div>
                  <div className="reward-item">
                    <span className="reward-icon">👤</span>
                    <div className="reward-info">
                      <span className="reward-label">Total Coins</span>
                      <span className="reward-value">{user?.coins || 0}</span>
                    </div>
                  </div>
                </div>
                
                <div className="achievements">
                  <p className="achievement-text">
                    Great job, {user?.username}! Your score has been saved.
                  </p>
                </div>
              </div>
            ) : (
              <div className="guest-results">
                <div className="guest-message">
                  <h4>🌟 Want to Save Your Progress?</h4>
                  <p>Create an account to:</p>
                  <ul className="benefits-list">
                    <li>💰 Earn and keep coins from your games</li>
                    <li>📈 Track your high scores and progress</li>
                    <li>🏆 Compete on global leaderboards</li>
                    <li>🔓 Unlock more challenging games</li>
                    <li>🎯 Set personal goals and achievements</li>
                  </ul>
                </div>
                
                <div className="guest-actions">
                  <button className="signup-btn" onClick={handleShowLogin}>
                    Sign Up & Save Progress
                  </button>
                  <p className="continue-text">or continue playing as guest</p>
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button className="play-again-btn" onClick={handlePlayAgain}>
              🎮 Play Again
            </button>
            <button className="close-game-btn" onClick={onClose}>
              🏠 Back to Games
            </button>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  )
}

export default GameCompleteModal 