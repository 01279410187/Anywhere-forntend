// import React from 'react';
// import {
//     Box,
//     Drawer,
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
//     Typography,
//     useTheme,
//     useMediaQuery,
//     ListItemProps,
// } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import { styled } from '@mui/system';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import GradeIcon from '@mui/icons-material/Grade';
// import InsightsIcon from '@mui/icons-material/Insights';
// import AnnouncementIcon from '@mui/icons-material/Announcement';
// import { Link as RouterLink, useLocation, LinkProps as RouterLinkProps } from 'react-router-dom';

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//     width: 240,
//     flexShrink: 0,
//     '& .MuiDrawer-paper': {
//         width: 240,
//         boxSizing: 'border-box',
//         background: theme.palette.primary.main,
//         color: '#FFFFFF',
//     },
// }));

// const Logo = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

// interface NavItemProps extends ListItemProps {
//     selected?: boolean;
//     component?: React.ElementType<RouterLinkProps>;
//     to?: string;
// }

// const NavItem = styled(ListItem, {
//     shouldForwardProp: (prop) => !['selected'].includes(prop as string),
// })<NavItemProps>(({ theme, selected }) => ({
//     color: '#FFFFFF',
//     borderLeft: selected ? `4px solid ${theme.palette.secondary.main}` : '4px solid transparent',
//     backgroundColor: selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
//     paddingLeft: theme.spacing(2),
//     '&:hover': {
//         backgroundColor: 'rgba(255, 255, 255, 0.15)',
//         cursor: 'pointer',
//         '& .MuiListItemIcon-root': {
//             color: '#FFFFFF',
//         },
//     },
//     '& .MuiListItemIcon-root': {
//         color: selected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
//         minWidth: 40,
//     },
// }));

// interface SidebarProps {
//     open: boolean;
//     onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
//     const theme = useTheme();
//     const { t } = useTranslation();
//     const location = useLocation();
//     const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//     const menuItems = [
//         { text: t('nav.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
//         { text: t('nav.schedule'), icon: <CalendarTodayIcon />, path: '/schedule' },
//         { text: t('nav.courses'), icon: <MenuBookIcon />, path: '/courses' },
//         { text: t('nav.gradebook'), icon: <GradeIcon />, path: '/gradebook' },
//         { text: t('nav.performance'), icon: <InsightsIcon />, path: '/performance' },
//         { text: t('nav.announcement'), icon: <AnnouncementIcon />, path: '/announcements' },
//     ];

//     const drawerContent = (
//         <>
//             <Logo>
//                 <Typography variant="h5" component="div" fontWeight="bold">
//                     {t('app.name')}
//                 </Typography>
//             </Logo>
//             <List>
//                 {menuItems.map((item) => (
//                     <NavItem
//                         key={item.text}
//                         component={RouterLink}
//                         to={item.path}
//                         selected={location.pathname === item.path}
//                         onClick={isMobile ? onClose : undefined}
//                     >
//                         <ListItemIcon>{item.icon}</ListItemIcon>
//                         <ListItemText primary={item.text} />
//                     </NavItem>
//                 ))}
//             </List>
//         </>
//     );

//     return (
//         <>
//             {isMobile ? (
//                 <Drawer
//                     variant="temporary"
//                     open={open}
//                     onClose={onClose}
//                     ModalProps={{ keepMounted: true }}
//                     sx={{
//                         '& .MuiDrawer-paper': {
//                             width: 240,
//                             background: theme.palette.primary.main,
//                             color: '#FFFFFF',
//                         },
//                     }}
//                 >
//                     {drawerContent}
//                 </Drawer>
//             ) : (
//                 <StyledDrawer variant="permanent" open>
//                     {drawerContent}
//                 </StyledDrawer>
//             )}
//         </>
//     );
// };

// export default Sidebar;




import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    ListItemProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Correct import
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GradeIcon from '@mui/icons-material/Grade';
import InsightsIcon from '@mui/icons-material/Insights';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Link as RouterLink, useLocation, LinkProps as RouterLinkProps } from 'react-router-dom';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

const Logo = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

interface NavItemProps extends ListItemProps {
    selected?: boolean;
    component?: React.ElementType<RouterLinkProps>;
    to?: string;
}

const NavItem = styled(ListItem, {
    shouldForwardProp: (prop) => !['selected'].includes(prop as string),
})<NavItemProps>(({ theme, selected }) => ({
    color: theme.palette.primary.contrastText,
    borderLeft: selected ? `4px solid ${theme.palette.secondary.main}` : '4px solid transparent',
    backgroundColor: selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    paddingLeft: theme.spacing(2),
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.contrastText,
        },
    },
    '& .MuiListItemIcon-root': {
        color: selected ? theme.palette.primary.contrastText : 'rgba(255, 255, 255, 0.7)',
        minWidth: 40,
    },
}));

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const menuItems = React.useMemo(() => [
        { 
            text: t('nav.dashboard') || 'Dashboard', 
            icon: <DashboardIcon />, 
            path: '/dashboard' 
        },
        { 
            text: t('nav.quizzes') || 'quizzes', 
            icon: <MenuBookIcon />, 
            path: '/quizzes' 
        },
        { 
            text: t('nav.announcement') || 'Announcements', 
            icon: <AnnouncementIcon />, 
            path: '/announcements' 
        },
    ].filter(item => item.text), [t]);

    const drawerContent = (
        <>
            <Logo>
                <Typography variant="h5" component="div" fontWeight="bold">
                    {t('app.name') || 'Learning Platform'}
                </Typography>
            </Logo>
            <List>
                {menuItems.map((item) => (
                    <NavItem
                        key={item.path}
                        component={RouterLink}
                        to={item.path}
                        selected={location.pathname.startsWith(item.path)}
                        onClick={isMobile ? onClose : undefined}
                        aria-current={location.pathname === item.path ? 'page' : undefined}
                    >
                        <ListItemIcon aria-hidden="true">{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </NavItem>
                ))}
            </List>
        </>
    );

    return (
        <>
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={onClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: 240,
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                <StyledDrawer variant="permanent" open>
                    {drawerContent}
                </StyledDrawer>
            )}
        </>
    );
};

export default Sidebar;