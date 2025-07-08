import { useState, useEffect } from 'react'
import { userAPI } from '../services/api'
import './LeaderboardPage.css'

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const response = await userAPI.getLeaderboard(20)
      if (response.data.success) {
        setLeaderboard(response.data.leaderboard)
      }
    } catch (err) {
      setError('Failed to load leaderboard')
      console.error('Leaderboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  if (loading) {
    return (
      <div className="leaderboard-page">
        <div className="loading">Loading leaderboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="leaderboard-page">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="leaderboard-page">
      <div className="page-header">
        <h1 className="page-title">🏆 Global Leaderboard</h1>
        <p className="page-subtitle">
          Top players ranked by total coins earned
        </p>
      </div>

      <div className="leaderboard-container">
        {leaderboard.length === 0 ? (
          <div className="empty-state">
            <h3>No players yet!</h3>
            <p>Be the first to play games and earn coins to appear on the leaderboard.</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            {leaderboard.map((player, index) => {
              const rank = index + 1
              return (
                <div key={player._id} className={`leaderboard-item ${rank <= 3 ? 'top-three' : ''}`}>
                  <div className="rank">
                    <span className="rank-icon">{getRankIcon(rank)}</span>
                  </div>
                  
                  <div className="player-info">
                    <h3 className="player-name">{player.username}</h3>
                    <div className="player-stats">
                      <span className="level">Level {player.level}</span>
                    </div>
                  </div>
                  
                  <div className="player-coins">
                    <span className="coins-amount">💰 {player.coins}</span>
                    <span className="coins-label">coins</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="leaderboard-info">
        <div className="info-card">
          <h3>How Rankings Work</h3>
          <ul>
            <li>🎮 Play games to earn coins</li>
            <li>🏆 Higher scores earn more coins</li>
            <li>📈 Level up by earning coins</li>
            <li>👑 Top players get recognition</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage 