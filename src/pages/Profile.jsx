import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import ProfileForm from '../components/ProfileForm';
import api from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
  try {
    setLoading(true);
    // Запрос к /api/user → проксируется на /users/1
    const res = await api.get('/user');
    setUser(res.data);
  } catch (err) {
    setError('Ошибка при загрузке профиля');
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async (data) => {
  try {
    setLoading(true);
    // PUT на /api/user → проксируется на /users/1
    await api.put('/user', data);
    setUser(data);
    setError(null);
    alert('Профиль успешно обновлен');
  } catch {
    setError('Ошибка при сохранении профиля');
  } finally {
    setLoading(false);
  }
};

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Личный кабинет</Typography>
      {user && <ProfileForm user={user} onSave={handleSave} />}
    </Box>
  );
}
