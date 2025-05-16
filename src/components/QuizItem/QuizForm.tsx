import React from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import {
  Box,
  TextField,
  Button,
  Stack,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Quiz } from '../../types/quiz';

interface QuizFormProps {
  onSubmit: (values: Omit<Quiz, '_id'>) => Promise<void>;
  onCancel: () => void;
  initialValues?: Quiz | null;
  isLoading: boolean;
}
export const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  course: z.string().min(2, 'Course must be at least 2 characters'),
  topic: z.string().min(3, 'Topic must be at least 3 characters'),
  dueDate: z.string().min(1, 'Due date is required'),
  contact: z.string().min(3, 'Contact must be at least 3 characters'),
});
type QuizFormValues = z.infer<typeof quizSchema>;
const QuizForm: React.FC<QuizFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  isLoading,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formik = useFormik<QuizFormValues>({
    initialValues: {
      title: initialValues?.title || '',
      course: initialValues?.course || '',
      topic: initialValues?.topic || '',
      dueDate: initialValues?.dueDate || '',
      contact: initialValues?.contact || '',
    },
    validationSchema: toFormikValidationSchema(quizSchema),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label={t('quizzes.title')}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && t(formik.errors.title || '')}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          id="course"
          name="course"
          label={t('quizzes.course')}
          value={formik.values.course}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.course && Boolean(formik.errors.course)}
          helperText={formik.touched.course && t(formik.errors.course || '')}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          id="topic"
          name="topic"
          label={t('quizzes.topic')}
          value={formik.values.topic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.topic && Boolean(formik.errors.topic)}
          helperText={formik.touched.topic && t(formik.errors.topic || '')}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          id="dueDate"
          name="dueDate"
          label={t('quizzes.dueDate')}
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
          helperText={formik.touched.dueDate && t(formik.errors.dueDate || '')}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          id="contact"
          name="contact"
          label={t('quizzes.contact')}
          value={formik.values.contact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contact && Boolean(formik.errors.contact)}
          helperText={formik.touched.contact && t(formik.errors.contact || '')}
          disabled={isLoading}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ color: theme.palette.text.primary }}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || !formik.isValid || formik.isSubmitting}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : initialValues ? (
              t('common.update')
            ) : (
              t('common.save')
            )}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default QuizForm;
