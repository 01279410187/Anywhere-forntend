import axios from 'axios'
import { Quiz } from '../types/quiz'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await axios.get<{ success: boolean; data: Quiz[] }>(`${API_URL}/quizzes`)
  return response.data.data
}

export const createQuiz = async (quiz: Omit<Quiz, '_id'>): Promise<Quiz> => {
  const payload = {
    ...quiz,
    dueDate: new Date(quiz.dueDate).toISOString(),
  };

  console.log('Sending quiz payload:', payload);

  const response = await axios.post<Quiz>(`${API_URL}/quizzes`, payload);
  return response.data;
};

export const updateQuiz = async (id: string, quiz: Omit<Quiz, '_id'>): Promise<Quiz> => {
   const payload = {
    ...quiz,
    dueDate: new Date(quiz.dueDate).toISOString(),
  };
  const response = await axios.put<Quiz>(`${API_URL}/quizzes/${id}`, payload)
  return response.data
}

export const deleteQuiz = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/quizzes/${id}`)
}
