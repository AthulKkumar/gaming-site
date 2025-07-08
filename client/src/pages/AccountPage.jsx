import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const AccountPage = () => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="account-page">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm">Username</label>
              <p className="text-white text-lg">{user?.username}</p>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm">Email</label>
              <p className="text-white text-lg">{user?.email}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm">Coins</label>
                <p className="text-yellow-400 text-xl font-bold">💰 {user?.coins || 0}</p>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm">Level</label>
                <p className="text-gaming-accent text-xl font-bold">⭐ {user?.level || 1}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm">Member Since</label>
              <p className="text-white">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage 