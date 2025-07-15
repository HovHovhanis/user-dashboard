import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, CircularProgress, Container, Box } from '@mui/material';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import NotFound from './pages/NotFount.jsx';

const drawerWidth = 240;

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
  return (
    <>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginLeft: `${drawerWidth}px`,
          padding: 3,
          marginTop: '64px', // высота AppBar (Header)
        }}
      >
        {children}
      </Box>
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Layout>
              <Orders />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </>
  );
}
