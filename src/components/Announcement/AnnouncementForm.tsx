import React from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  Box,
  TextField,
  Button,
  Stack,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Announcement } from '../../types/announcement';

const announcementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  author: z.string().min(3, 'Author must be at least 3 characters'),
  course: z.string().min(2, 'Course must be at least 2 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

interface AnnouncementFormProps {
  onSubmit: (values: Omit<Announcement, '_id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
  initialValues?: Announcement | null;
  isLoading: boolean;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  isLoading,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formik = useFormik<AnnouncementFormValues>({
    initialValues: {
      title: initialValues?.title || '',
      author: initialValues?.author || '',
      course: initialValues?.course || '',
      content: initialValues?.content || '',
    },
    validationSchema: toFormikValidationSchema(announcementSchema),
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
          label={t('announcements.title')}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && t(formik.errors.title || '')}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          id="author"
          name="author"
          label={t('announcements.author')}
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && t(formik.errors.author || '')}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          id="course"
          name="course"
          label={t('announcements.course')}
          value={formik.values.course}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.course && Boolean(formik.errors.course)}
          helperText={formik.touched.course && t(formik.errors.course || '')}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          id="content"
          name="content"
          label={t('announcements.content')}
          multiline
          rows={4}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && t(formik.errors.content || '')}
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

export default AnnouncementForm;