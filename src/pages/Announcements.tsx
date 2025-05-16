
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
    useTheme,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store';
import {
    fetchAnnouncements,
    addAnnouncement,
    updateAnnouncement,
    removeAnnouncement,
} from '../store/slices/announcementSlice';
import Layout from '../components/Layout';
import AnnouncementForm from '../components/Announcement/AnnouncementForm';
import { Announcement } from '../types/announcement';
import requireAuth from '../hoc/requireAuth';

const Announcements: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        items: announcements,
        loading,
        error,
        addLoading,
        updateLoading,
        deleteLoading
    } = useAppSelector((state) => state.announcements);

    const [open, setOpen] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);

    useEffect(() => {
        dispatch(fetchAnnouncements());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            setSnackbar({
                open: true,
                message: error,
                severity: 'error'
            });
        }
    }, [error]);

    const handleOpen = () => {
        setCurrentAnnouncement(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentAnnouncement(null);
    };

    const handleEdit = (announcement: Announcement) => {
        setCurrentAnnouncement(announcement);
        setOpen(true);
    };

    const handleDeleteClick = (announcement: Announcement) => {
        setAnnouncementToDelete(announcement);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!announcementToDelete) return;

        try {
            await dispatch(removeAnnouncement(announcementToDelete._id)).unwrap();
            await dispatch(fetchAnnouncements());
            setSnackbar({
                open: true,
                message: t('announcements.deleteSuccess'),
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: t('announcements.deleteError'),
                severity: 'error',
            });
        } finally {
            setDeleteDialogOpen(false);
            setAnnouncementToDelete(null);
        }
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setAnnouncementToDelete(null);
    };

    const handleSubmit = async (announcement: Omit<Announcement, '_id' | 'createdAt'>) => {
        try {
            if (currentAnnouncement) {
                await dispatch(updateAnnouncement({
                    id: currentAnnouncement._id,
                    data: announcement
                })).unwrap();
                setSnackbar({
                    open: true,
                    message: t('announcements.updateSuccess'),
                    severity: 'success'
                });
            } else {
                await dispatch(addAnnouncement(announcement)).unwrap();
                setSnackbar({
                    open: true,
                    message: t('announcements.addSuccess'),
                    severity: 'success'
                });
            }

            await dispatch(fetchAnnouncements());
            handleClose();
        } catch (error) {
            setSnackbar({
                open: true,
                message: t('announcements.operationError'),
                severity: 'error'
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Layout>
            <Box sx={{ p: 3 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography variant="h4" component="h1">
                        {t('announcements.title')}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleOpen}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : t('announcements.add')}
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
                                    <TableCell>{t('announcements.title')}</TableCell>
                                    <TableCell>{t('announcements.author')}</TableCell>
                                    <TableCell>{t('announcements.course')}</TableCell>
                                    <TableCell>{t('announcements.actions')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {announcements.map((announcement) => (
                                    <TableRow key={announcement._id}>
                                        <TableCell>{announcement.title}</TableCell>
                                        <TableCell>{announcement.author}</TableCell>
                                        <TableCell>{announcement.course}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(announcement)}
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
                                                onClick={() => handleDeleteClick(announcement)}
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
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        {currentAnnouncement ? t('announcements.edit') : t('announcements.add')}
                    </DialogTitle>
                    <DialogContent>
                        <AnnouncementForm
                            onSubmit={handleSubmit}
                            onCancel={handleClose}
                            initialValues={currentAnnouncement}
                            isLoading={addLoading || updateLoading}
                        />
                    </DialogContent>
                </Dialog>

                
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                >
                    <DialogTitle>{t('announcements.confirmDeleteTitle') || 'Confirm Delete'}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {t('announcements.confirmDelete') || 'Are you sure you want to delete this announcement?'}
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
                            {deleteLoading ? <CircularProgress size={20} /> : t('common.delete') || 'Delete'}
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

export default requireAuth(Announcements);

