import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'

const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/games')
    }
  }, [isAuthenticated, navigate])

  const handleClose = () => {
    navigate('/')
  }

  if (isAuthenticated) {
    return null // Will redirect via useEffect
  }

  return <LoginModal onClose={handleClose} />
}

export default LoginPage 