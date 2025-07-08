import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { gameAPI } from '../services/api'
import './GamePage.css'

const GamePage = () => {
  const { isAuthenticated, user } = useAuth()
  const [gameAccess, setGameAccess] = useState({})
  const [loading, setLoading] = useState(false)

  const games = [
    {
      id: 'wordscrambler',
      name: 'Word Scrambler',
      description: 'Unscramble words to earn points and coins!',
      difficulty: 'Easy',
      coins: 10,
      icon: '🔤',
      path: '/games/wordscrambler'
    },
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      description: 'Classic strategy game against the computer.',
      difficulty: 'Easy',
      coins: 8,
      icon: '⭕',
      path: '/games/tictactoe'
    },
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Test your memory with card matching!',
      difficulty: 'Medium',
      coins: 12,
      icon: '🧠',
      path: '/games/memory'
    },
    {
      id: 'snake',
      name: 'Snake Game',
      description: 'Control the snake and eat food to grow!',
      difficulty: 'Hard',
      coins: 15,
      icon: '🐍',
      path: '/games/snake'
    }
  ]

  useEffect(() => {
    if (isAuthenticated) {
      checkGameAccess()
    }
  }, [isAuthenticated])

  const checkGameAccess = async () => {
    setLoading(true)
    try {
      const accessPromises = games.map(game => 
        gameAPI.checkAccess(game.id).catch(() => ({ data: { access: { hasAccess: false } } }))
      )
      const results = await Promise.all(accessPromises)
      
      const accessMap = {}
      games.forEach((game, index) => {
        accessMap[game.id] = results[index].data?.access || { hasAccess: false }
      })
      
      setGameAccess(accessMap)
    } catch (error) {
      console.error('Error checking game access:', error)
    } finally {
      setLoading(false)
    }
  }

  const canPlayGame = (gameId) => {
    if (!isAuthenticated) return true // Guests can play all games
    return gameAccess[gameId]?.hasAccess !== false
  }

  const getGameStatus = (gameId) => {
    if (!isAuthenticated) return 'play-guest'
    if (loading) return 'loading'
    if (canPlayGame(gameId)) return 'play'
    return 'locked'
  }

  return (
    <div className="game-page">
      <div className="page-header">
        <h1 className="page-title">Choose Your Game</h1>
        <p className="page-subtitle">
          {isAuthenticated 
            ? `Welcome back, ${user?.username}! You have ${user?.coins || 0} coins.`
            : 'Playing as guest. Sign up to save your progress and earn coins!'
          }
        </p>
      </div>

      <div className="games-grid">
        {games.map((game) => {
          const status = getGameStatus(game.id)
          const access = gameAccess[game.id]
          
          return (
            <div key={game.id} className={`game-card ${status}`}>
              <div className="game-icon">{game.icon}</div>
              
              <div className="game-info">
                <h3 className="game-name">{game.name}</h3>
                <p className="game-description">{game.description}</p>
                
                <div className="game-meta">
                  <span className="game-difficulty">{game.difficulty}</span>
                  <span className="game-coins">💰 {game.coins} coins</span>
                </div>
              </div>

              <div className="game-actions">
                {status === 'loading' ? (
                  <button className="game-btn loading" disabled>
                    Loading...
                  </button>
                ) : status === 'locked' ? (
                  <div className="locked-info">
                    <p className="lock-message">🔒 Locked</p>
                    <p className="lock-requirements">
                      Need: {access?.required?.minCoins || 0} coins
                    </p>
                    <p className="current-stats">
                      You have: {access?.current?.coins || 0} coins
                    </p>
                  </div>
                ) : (
                  <Link to={game.path} className="game-btn play">
                    {status === 'play-guest' ? 'Play as Guest' : 'Play Game'}
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {!isAuthenticated && (
        <div className="guest-notice">
          <div className="notice-content">
            <h3>🎮 Want to Save Your Progress?</h3>
            <p>Create an account to:</p>
            <ul>
              <li>💰 Earn and keep coins</li>
              <li>📈 Track your high scores</li>
              <li>🏆 Compete on leaderboards</li>
              <li>🔓 Unlock advanced games</li>
            </ul>
            <Link to="/login" className="signup-btn">
              Sign Up Now
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePage 