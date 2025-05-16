
export interface Quiz {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string; 
  contact: string;
}



export interface QuizzesState {
  items: Quiz[];
  loading: boolean;
  error: string | null;
   addLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}
