import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<div style={{color: 'white', textAlign: 'center', marginTop: '50px', fontSize: '24px'}}>Trang chủ (Redirecting...)<br/><br/><a href="/register" style={{color: '#ff4d4d'}}>Đi đến Đăng ký</a></div>} />
      </Routes>
    </Router>
  );
}

export default App;
