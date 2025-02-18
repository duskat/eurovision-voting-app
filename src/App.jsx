import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="app-wrapper">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/vote">Vote</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App; 