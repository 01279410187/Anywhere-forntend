import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Chip
} from '@mui/material';
import { styled } from '@mui/system';
import { Quiz } from '../../types/quiz';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const QuizContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: 8,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

interface QuizItemProps {
  quiz: Quiz;
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  const { t } = useTranslation();
  const dueDate = new Date(quiz.dueDate);
  const formattedDate = format(dueDate, 'dd MMM yyyy - hh:mm a');
  
  return (
    <QuizContainer elevation={0}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {quiz.title}
        </Typography>
        <Chip label={quiz.course} size="small" />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
         {`${t('Topic')}: ${quiz.topic}`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
         {`${t('quizzes.dueDate')}: ${formattedDate}`}
      </Typography>
      <Button 
        variant="outlined" 
        size="small" 
        sx={{ mt: 1 }}
        fullWidth={false}
      >
        {quiz.title.toLowerCase().includes('quiz') ?  t('quizzes.startQuiz') : t('quizzes.solveAssignment')}
      </Button>
    </QuizContainer>
  );
};

export default QuizItem;