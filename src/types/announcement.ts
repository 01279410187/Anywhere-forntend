

export interface Announcement {
    _id: string;
    title: string;
    author: string;
    course: string;
    content: string;
    createdAt: string;
}




export interface AnnouncementsState {
  items: Announcement[];
  loading: boolean;
  error: string | null;
  addLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

