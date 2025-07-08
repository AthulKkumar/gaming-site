import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { gameAPI } from '../services/api'
import GameCompleteModal from '../components/GameCompleteModal'
import './WordScramblerGame.css'

const WordScramblerGame = () => {
  const { isAuthenticated } = useAuth()
  const [gameState, setGameState] = useState('start') // 'start', 'playing', 'complete'
  const [currentWord, setCurrentWord] = useState('')
  const [scrambledWord, setScrambledWord] = useState('')
  const [userGuess, setUserGuess] = useState('')
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const words = [
    'apple', 'orange', 'mango', 'pineapple', 'grapes', 'banana', 
    'carrot', 'potato', 'watermelon', 'strawberry', 'lemon', 'cherry',
    'peach', 'plum', 'kiwi', 'coconut', 'pear', 'melon'
  ]

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
  }

  const scrambleWord = (word) => {
    const wordArray = word.split('')
    // Fisher-Yates shuffle algorithm
    for (let i = wordArray.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]
    }
    const scrambled = wordArray.join('')
    
    // Ensure the scrambled word is different from the original
    if (scrambled === word && word.length > 1) {
      return scrambleWord(word) // Recursively scramble until different
    }
    
    return scrambled
  }

  const startGame = () => {
    const newWord = getRandomWord()
    const scrambled = scrambleWord(newWord)
    
    setCurrentWord(newWord)
    setScrambledWord(scrambled)
    setGameState('playing')
    setUserGuess('')
    setMessage(`Unscramble this word: ${scrambled}`)
    setIsCorrect(false)
    setStartTime(Date.now())
  }

  const submitGuess = () => {
    if (!userGuess.trim()) return

    const isGuessCorrect = userGuess.toLowerCase().trim() === currentWord.toLowerCase()
    
    if (isGuessCorrect) {
      const newScore = score + 1
      setScore(newScore)
      setIsCorrect(true)
      setMessage(`🎉 Correct! The word was "${currentWord}"`)
      
      // Check if game should end (after 10 correct answers)
      if (newScore >= 10) {
        setGameComplete(true)
        handleGameComplete(newScore)
      } else {
        // Continue with next word after a short delay
        setTimeout(() => {
          startGame()
        }, 2000)
      }
    } else {
      setIsCorrect(false)
      setMessage(`❌ Incorrect! The word was "${currentWord}". Try again!`)
      setGameComplete(true)
      handleGameComplete(score)
    }
    
    setUserGuess('')
  }

  const handleGameComplete = async (finalScore) => {
    const duration = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0
    
    try {
      if (isAuthenticated) {
        // Submit score for logged-in users
        const result = await gameAPI.recordResult({
          game: 'wordscrambler',
          score: finalScore,
          duration,
          difficulty: 'easy'
        })
        
        if (result.data.success) {
          setShowModal(true)
        }
      } else {
        // For guests, just show local results
        await gameAPI.guestComplete({
          game: 'wordscrambler',
          score: finalScore,
          duration
        })
        setShowModal(true)
      }
    } catch (error) {
      console.error('Error submitting game result:', error)
      setShowModal(true) // Still show modal even if submission fails
    }
  }

  const resetGame = () => {
    setGameState('start')
    setScore(0)
    setMessage('')
    setGameComplete(false)
    setShowModal(false)
    setCurrentWord('')
    setScrambledWord('')
    setUserGuess('')
    setIsCorrect(false)
    setStartTime(null)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && gameState === 'playing' && !gameComplete) {
      submitGuess()
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [gameState, userGuess, gameComplete])

  return (
    <div className="word-scrambler-game">
      <div className="game-container">
        <div className="game-header">
          <h1 className="game-title">🔤 Word Scrambler</h1>
          <div className="game-stats">
            <div className="stat">
              <span className="stat-label">Score:</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Target:</span>
              <span className="stat-value">10 words</span>
            </div>
          </div>
        </div>

        <div className="game-content">
          {gameState === 'start' && (
            <div className="start-screen">
              <div className="instructions">
                <h2>How to Play</h2>
                <ul>
                  <li>🎯 Unscramble the given letters to form a word</li>
                  <li>⏱️ Try to get 10 words correct to complete the game</li>
                  <li>💰 Earn coins based on your performance</li>
                  <li>🏆 Compete with other players on the leaderboard</li>
                </ul>
              </div>
              <button className="start-btn" onClick={startGame}>
                Start Game
              </button>
            </div>
          )}

          {gameState === 'playing' && !gameComplete && (
            <div className="playing-screen">
              <div className="word-display">
                <h2 className="scrambled-word">{scrambledWord}</h2>
                <p className="hint">Letters: {scrambledWord.length}</p>
              </div>

              <div className="input-section">
                <input
                  type="text"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  placeholder="Type your guess here..."
                  className="guess-input"
                  autoFocus
                />
                <button 
                  className="submit-btn"
                  onClick={submitGuess}
                  disabled={!userGuess.trim()}
                >
                  Submit Guess
                </button>
              </div>

              {message && (
                <div className={`message ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {message}
                </div>
              )}
            </div>
          )}

          {gameComplete && (
            <div className="complete-screen">
              <h2 className="final-message">
                {score >= 10 ? '🎉 Congratulations!' : '🎮 Game Over'}
              </h2>
              <div className="final-stats">
                <p>Final Score: <strong>{score}</strong></p>
                <p>
                  {score >= 10 
                    ? 'Perfect game! You unscrambled all 10 words!' 
                    : `You unscrambled ${score} word${score !== 1 ? 's' : ''}. Try again to improve!`
                  }
                </p>
              </div>
              <button className="play-again-btn" onClick={resetGame}>
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <GameCompleteModal
          game="Word Scrambler"
          score={score}
          isAuthenticated={isAuthenticated}
          onClose={() => setShowModal(false)}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  )
}

export default WordScramblerGame 