import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  useTheme 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser } from '../store/slices/authSlice';
import SchoolIcon from '@mui/icons-material/School';

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isLoggedIn, loading } = useAppSelector(state => state.auth);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    await dispatch(loginUser());
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Box 
            sx={{ 
              bgcolor: theme.palette.primary.main, 
              borderRadius: '50%', 
              p: 2, 
              mb: 2 
            }}
          >
            <SchoolIcon fontSize="large" sx={{ color: 'white' }} />
          </Box>

          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            {t('app.name')}
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 3 }}>
            Student Learning Platform
          </Typography>

          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? t('Loading...') : t('auth.login')}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;