import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

export default function OrderList({ orders }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1200 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Номер заказа</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell align="right">Сумма, ₽</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(({ id, date, status, total }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell align="right">{total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
