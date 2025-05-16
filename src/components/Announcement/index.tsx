
import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Divider, 
  Paper,
  useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import { Announcement as AnnouncementType } from '../../types/announcement';
import { format } from 'date-fns';

const AnnouncementContainer = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: 8,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
}));

const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '12px',
});

const AuthorContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const getAvatarColor = (name: string) => {
  const colors = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', 
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
  ];
  
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  
  return colors[sum % colors.length];
};

interface AnnouncementProps {
  announcement: AnnouncementType;
}

const AnnouncementItem: React.FC<AnnouncementProps> = ({ announcement }) => {
  const theme = useTheme();
  const avatarColor = getAvatarColor(announcement.author);
  const formattedDate = format(new Date(announcement.createdAt), 'MMM dd');

  return (
    <AnnouncementContainer elevation={0}>
      <HeaderContainer>
        <AuthorContainer>
          <Avatar 
            sx={{ 
              bgcolor: avatarColor,
              width: 40, 
              height: 40,
            }}
          >
            {announcement.author.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {announcement.author}
            </Typography>
            {announcement.course && (
              <Typography variant="caption" color="textSecondary">
                {announcement.course}
              </Typography>
            )}
          </Box>
        </AuthorContainer>
        <Typography variant="caption" color="textSecondary">
          {formattedDate}
        </Typography>
      </HeaderContainer>
      
      <Divider sx={{ my: 1 }} />
      
      <Typography variant="body2" paragraph sx={{ mt: 2 }}>
        {announcement.content}
      </Typography>
    </AnnouncementContainer>
  );
};

export default AnnouncementItem;