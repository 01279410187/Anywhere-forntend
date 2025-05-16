import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as quizzesAPI from '../../api/quizzes';
import { Quiz, QuizzesState } from '../../types/quiz';

const initialState: QuizzesState = {
  items: [],
  loading: false,
  error: null,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const fetchQuizzes = createAsyncThunk<Quiz[]>(
  'quizzes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quizzesAPI.getQuizzes();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch quizzes');
    }
  }
);

export const addQuiz = createAsyncThunk<Quiz, Omit<Quiz, '_id'>>(
  'quizzes/add',
  async (quiz, { rejectWithValue }) => {
    try {
      const data = await quizzesAPI.createQuiz(quiz);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add quiz');
    }
  }
);

export const updateQuiz = createAsyncThunk<Quiz, { id: string; data: Omit<Quiz, '_id'> }>(
  'quizzes/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updated = await quizzesAPI.updateQuiz(id, data);
      return updated;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update quiz');
    }
  }
);

export const removeQuiz = createAsyncThunk<string, string>(
  'quizzes/remove',
  async (id, { rejectWithValue }) => {
    try {
      await quizzesAPI.deleteQuiz(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete quiz');
    }
  }
);

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchQuizzes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchQuizzes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchQuizzes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add
    builder.addCase(addQuiz.pending, (state) => {
      state.addLoading = true;
      state.error = null;
    });
    builder.addCase(addQuiz.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.items.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      state.addLoading = false;
    });
    builder.addCase(addQuiz.rejected, (state, action) => {
      state.addLoading = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateQuiz.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
    });
    builder.addCase(updateQuiz.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.items.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      state.updateLoading = false;
    });
    builder.addCase(updateQuiz.rejected, (state, action) => {
      state.updateLoading = false;
      state.error = action.payload as string;
    });

    // Remove
    builder.addCase(removeQuiz.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
    });
    builder.addCase(removeQuiz.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.deleteLoading = false;
    });
    builder.addCase(removeQuiz.rejected, (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default quizSlice.reducer;