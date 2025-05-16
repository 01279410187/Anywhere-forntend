
import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Tabs,
    Tab,
    useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchAnnouncements } from '../store/slices/announcementSlice';
import { fetchQuizzes } from '../store/slices/quizSlice';
import Layout from '../components/Layout';
import AnnouncementItem from '../components/Announcement';
import QuizItem from '../components/QuizItem';
import requireAuth from '../hoc/requireAuth';
import { useNavigate } from "react-router";


const BannerPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundImage: 'url(/images/exam-banner-bg.svg)',
    backgroundSize: 'contain',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 8,
}));

const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    minWidth: 'auto',
    padding: theme.spacing(1),
    textTransform: 'none',
}));

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const announcements = useAppSelector((state) => state.announcements.items);
    const quizzes = useAppSelector((state) => state.quizzes.items);
    const [announcementTab, setAnnouncementTab] = React.useState(0);
    const [quizTab, setQuizTab] = React.useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAnnouncements());
        dispatch(fetchQuizzes());
        console.log("announcements", announcements)
    }, [dispatch]);

    const handleAnnouncementTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setAnnouncementTab(newValue);
    };

    const handleQuizTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setQuizTab(newValue);
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1, py: 2 }}>
                
                <BannerPaper elevation={0}>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Box
                            sx={{
                                flex: '1 1 100%',
                                '@media (min-width: 900px)': { flex: '0 0 58.3333%' }, // ≈ md={7}
                            }}
                        >
                            <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'medium' }}>
                                {t('dashboard.examsTime')}
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                {t('dashboard.examsDesc')}
                            </Typography>

                            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1, mb: 2 }}>
                                {t('dashboard.einsteinQuote')}
                            </Typography>

                            <Button variant="contained" color="secondary" sx={{ mt: 1 }}>
                                {t('dashboard.viewExamsTips')}
                            </Button>
                        </Box>
                    </Box>
                </BannerPaper>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            flex: '1 1 100%',
                            '@media (min-width: 900px)': { flex: '0 0 66.6667%' }, // ≈ md={8}
                        }}
                    >
                        <SectionHeader>
                            <Typography variant="h6" fontWeight="medium">
                                {t('announcements.title')}
                            </Typography>

                            <Tabs
                                value={announcementTab}
                                onChange={handleAnnouncementTabChange}
                                textColor="primary"
                                sx={{
                                    '.MuiTabs-indicator': {
                                        backgroundColor: theme.palette.secondary.main,
                                    }
                                }}

                            >
                                <button onClick={() => { navigate('/announcements') }} style={{border:'0px'}}>
                                    <StyledTab label={t('announcements.all')} />
                                </button>
                            </Tabs>
                        </SectionHeader>
                        {Array.isArray(announcements) && announcements.map((announcement) => (
                            <AnnouncementItem key={announcement._id} announcement={announcement} />
                        ))}
                    </Box>

                    <Box
                        sx={{
                            flex: '1 1 100%',
                            '@media (min-width: 900px)': { flex: '0 0 33.3333%' }, // ≈ md={4}
                        }}
                    >
                        <SectionHeader>
                            <Typography variant="h6" fontWeight="medium">
                                {t('quizzes.title')}
                            </Typography>

                            <Tabs
                                value={quizTab}
                                onChange={handleQuizTabChange}
                                textColor="primary"
                                sx={{
                                    '.MuiTabs-indicator': {
                                        backgroundColor: theme.palette.secondary.main,
                                    }
                                }}
                            >

                                 <button onClick={() => { navigate('/quizzes') }} style={{border:'0px'}}>
                                     <StyledTab label={t('quizzes.all')} />
                                </button>
                             
                            </Tabs>
                        </SectionHeader>
                        {Array.isArray(quizzes) && quizzes.map((quiz) => (
                            <QuizItem key={quiz._id} quiz={quiz} />
                        ))}
                    </Box>

                </Box>

            </Box>
        </Layout>
    );
};

export default requireAuth(Dashboard);








