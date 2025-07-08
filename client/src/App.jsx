import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import GamePage from './pages/GamePage'
import AccountPage from './pages/AccountPage'
import LeaderboardPage from './pages/LeaderboardPage'
import WordScramblerGame from './games/WordScramblerGame'
import SnakeGame from './games/SnakeGame'
import MemoryGame from './games/MemoryGame'
import TicTacToeGame from './games/TicTacToeGame'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/games" element={<GamePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/games/wordscrambler" element={<WordScramblerGame />} />
            <Route path="/games/snake" element={<SnakeGame />} />
            <Route path="/games/memory" element={<MemoryGame />} />
            <Route path="/games/tictactoe" element={<TicTacToeGame />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App 