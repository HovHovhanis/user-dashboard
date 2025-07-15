import { useEffect, useState } from 'react';
import { Typography, CircularProgress, Alert } from '@mui/material';
import api from '../services/api';
import OrderList from '../components/OrderList';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders');
      setOrders(res.data);
      setError(null);
    } catch {
      setError('Ошибка при загрузке заказов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <Typography variant="h4" gutterBottom>Мои заказы</Typography>
      <OrderList orders={orders} />
    </>
  );
}
