import { AnnouncementsState } from "./announcement";
import { QuizzesState } from "./quiz";

export interface AuthState {
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}

export interface RootState {
    auth: AuthState;
    announcements: AnnouncementsState;
    quizzes: QuizzesState;
}