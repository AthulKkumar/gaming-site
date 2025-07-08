const MemoryGame = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gaming-accent mb-4">🧠 Memory Game</h1>
        <p className="text-gray-300 mb-6">
          Coming Soon! This memory card matching game is being converted to React.
        </p>
        <div className="space-y-4">
          <p className="text-lg">🎮 Features will include:</p>
          <ul className="text-left space-y-2 text-gray-300">
            <li>• Card flipping and matching</li>
            <li>• Multiple difficulty levels</li>
            <li>• Timer and move counting</li>
            <li>• Beautiful card animations</li>
          </ul>
        </div>
        <button 
          className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-lg cursor-not-allowed"
          disabled
        >
          Coming Soon
        </button>
      </div>
    </div>
  )
}

export default MemoryGame 