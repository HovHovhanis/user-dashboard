import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      api.get(`/users/${userId}`) 
        .then(res => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

    const login = async (email, password) => {
  try {
    // Получаем пользователя по email
    const res = await api.get(`/users?email=${encodeURIComponent(email)}`);
    console.log('Ответ от сервера:', res.data);
    const users = res.data;

    if (users.length === 1 && users[0].password === password) {
      const user = users[0];
      localStorage.setItem('token', 'mock-token'); // мокаем токен
      localStorage.setItem('userId', user.id);     // сохраняем id
      setUser(user);
      setIsAuthenticated(true);
      navigate('/profile');
    } else {
      throw new Error('Неверный email или пароль');
    }
  } catch (err) {
    throw err;
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
