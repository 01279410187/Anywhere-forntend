import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchQuizzes,
  addQuiz,
  updateQuiz,
  removeQuiz,
} from '../store/slices/quizSlice';
import Layout from '../components/Layout';
import QuizForm from '../components/QuizItem/QuizForm';
import { Quiz } from '../types/quiz';
import requireAuth from '../hoc/requireAuth';

const Quizzes: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    items: quizzes,
    loading,
    error,
    addLoading,
    updateLoading,
    deleteLoading,
  } = useAppSelector((state) => state.quizzes);

  const [open, setOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: 'error',
      });
    }
  }, [error]);

  const handleOpen = () => {
    setCurrentQuiz(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentQuiz(null);
  };

  const handleEdit = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setOpen(true);
  };

  const handleDeleteClick = (quiz: Quiz) => {
    setQuizToDelete(quiz);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!quizToDelete) return;

    try {
      await dispatch(removeQuiz(quizToDelete._id)).unwrap();
      await dispatch(fetchQuizzes());
      setSnackbar({
        open: true,
        message: t('quizzes.deleteSuccess'),
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: t('quizzes.deleteError'),
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setQuizToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setQuizToDelete(null);
  };

  const handleSubmit = async (quiz: Omit<Quiz, '_id'>) => {
    try {
      if (currentQuiz) {
        await dispatch(updateQuiz({ id: currentQuiz._id, data: quiz })).unwrap();
        setSnackbar({
          open: true,
          message: t('quizzes.updateSuccess'),
          severity: 'success',
        });
      } else {
        await dispatch(addQuiz(quiz)).unwrap();
        setSnackbar({
          open: true,
          message: t('quizzes.addSuccess'),
          severity: 'success',
        });
      }
      await dispatch(fetchQuizzes());
      handleClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: t('quizzes.operationError'),
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            {t('quizzes.title')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpen}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : t('quizzes.add')}
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('quizzes.title')}</TableCell>
                  <TableCell>{t('quizzes.course')}</TableCell>
                  <TableCell>{t('quizzes.dueDate')}</TableCell>
                  <TableCell>{t('quizzes.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizzes.map((quiz) => (
                  <TableRow key={quiz._id}>
                    <TableCell>{quiz.title}</TableCell>
                    <TableCell>{quiz.course}</TableCell>
                    <TableCell>{new Date(quiz.dueDate).toLocaleDateString()}</TableCell>
                   
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(quiz)}
                        disabled={updateLoading}
                      >
                        {updateLoading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Edit />
                        )}
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(quiz)}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Delete />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add/Edit Form Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {currentQuiz ? t('quizzes.edit') : t('quizzes.add')}
          </DialogTitle>
          <DialogContent>
            <QuizForm
              onSubmit={handleSubmit}
              onCancel={handleClose}
              initialValues={currentQuiz}
              isLoading={addLoading || updateLoading}
            />
          </DialogContent>
        </Dialog>

        
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>
            {t('quizzes.confirmDeleteTitle') || 'Confirm Delete'}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {t('quizzes.confirmDelete') || 'Are you sure you want to delete this quiz?'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>
              {t('common.cancel') || 'Cancel'}
            </Button>
            <Button
              onClick={confirmDelete}
              color="error"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <CircularProgress size={20} />
              ) : (
                t('common.delete') || 'Delete'
              )}
            </Button>
          </DialogActions>
        </Dialog>

      
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default requireAuth(Quizzes);
