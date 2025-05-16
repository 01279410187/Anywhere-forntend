import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as announcementsAPI from '../../api/announcements';
import { Announcement, AnnouncementsState } from '../../types/announcement';

const initialState: AnnouncementsState = {
  items: [],
  loading: false,
  error: null,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const fetchAnnouncements = createAsyncThunk<Announcement[]>(
  'announcements/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await announcementsAPI.getAnnouncements();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch announcements');
    }
  }
);

export const addAnnouncement = createAsyncThunk<Announcement, Omit<Announcement, '_id' | 'createdAt'>>(
  'announcements/add',
  async (announcement, { rejectWithValue }) => {
    try {
      const data = await announcementsAPI.createAnnouncement(announcement);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add announcement');
    }
  }
);

export const updateAnnouncement = createAsyncThunk<
  Announcement,
  { id: string; data: Omit<Announcement, '_id' | 'createdAt'> }
>(
  'announcements/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updated = await announcementsAPI.updateAnnouncement(id, data);
      return updated;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update announcement');
    }
  }
);

export const removeAnnouncement = createAsyncThunk<string, string>(
  'announcements/remove',
  async (id, { rejectWithValue }) => {
    try {
      await announcementsAPI.deleteAnnouncement(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete announcement');
    }
  }
);

const announcementSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   
    builder.addCase(fetchAnnouncements.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAnnouncements.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAnnouncements.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

   
    builder.addCase(addAnnouncement.pending, (state) => {
      state.addLoading = true;
      state.error = null;
    });
    builder.addCase(addAnnouncement.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
      state.addLoading = false;
    });
    builder.addCase(addAnnouncement.rejected, (state, action) => {
      state.addLoading = false;
      state.error = action.payload as string;
    });

   
    builder.addCase(updateAnnouncement.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
    });
    builder.addCase(updateAnnouncement.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.updateLoading = false;
    });
    builder.addCase(updateAnnouncement.rejected, (state, action) => {
      state.updateLoading = false;
      state.error = action.payload as string;
    });

   
    builder.addCase(removeAnnouncement.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
    });
    builder.addCase(removeAnnouncement.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.deleteLoading = false;
    });
    builder.addCase(removeAnnouncement.rejected, (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default announcementSlice.reducer;