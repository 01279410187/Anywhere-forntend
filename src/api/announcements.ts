import axios from 'axios';
import { Announcement } from '../types/announcement';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


export const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await axios.get<{ success: boolean; data: Announcement[] }>(`${API_URL}/announcements`);
  return response.data.data;
};


export const createAnnouncement = async (
  announcement: Omit<Announcement, '_id' | 'createdAt'>
): Promise<Announcement> => {
  const response = await axios.post<Announcement>(`${API_URL}/announcements`, announcement)
  return response.data
}

export const updateAnnouncement = async (
  id: string,
  announcement: Omit<Announcement, '_id' | 'createdAt'>
): Promise<Announcement> => {
  const response = await axios.put<Announcement>(`${API_URL}/announcements/${id}`, announcement)
  return response.data
}

export const deleteAnnouncement = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/announcements/${id}`)
}