import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Gọi API đến backend (khi backend đã chạy ở cổng 5000)
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      setSuccess('Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-header">
          <h1>Tạo Tài Khoản</h1>
          <p>Tham gia cùng chúng tôi để trải nghiệm điện ảnh tuyệt vời nhất</p>
        </div>
        
        <form className="glass-panel register-form" onSubmit={handleSubmit}>
          {success && <div className="success-text">{success}</div>}
          
          <div className="form-group">
            <label className="form-label">Họ và tên</label>
            <input 
              type="text" 
              name="username"
              className="form-input" 
              placeholder="Nhập họ và tên của bạn"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="Nhập địa chỉ email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              name="confirmPassword"
              className="form-input" 
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          {error && <span className="error-text" style={{marginBottom: '15px'}}>{error}</span>}
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'ĐĂNG KÝ NGAY'}
          </button>
          
          <div className="register-footer">
            Đã có tài khoản? <a href="/login" className="login-link">Đăng nhập</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
