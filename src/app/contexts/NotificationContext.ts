import axios from 'axios';
import { create } from 'zustand';
const initialState = {
  notifications: [] as Array<any>,
  updateSuccess: false,
  getNotifications: async () => {},
  clearNotifications: async () => {},
  createNotification: async (notification: any) => {},
  deleteNotification: async (notificationID: number) => {}
};
type StateType = typeof initialState;

export const useNotification = create<StateType>((set) => ({
  ...initialState,
  getNotifications: async () => {
    try {
      const res = await axios.get('/api/notification');
      set({ notifications: res.data });
    } catch (error) {}
  },
  clearNotifications: async () => {
    try {
      await axios.post('/api/notification/delete-all');
      set({ updateSuccess: true });
    } catch (error) {}
  },
  createNotification: async (notification: any) => {
    try {
      await axios.post('/api/notification/add', { notification });
      set({ updateSuccess: true });
    } catch (error) {}
  },

  deleteNotification: async (notificationID: number) => {
    try {
      await axios.post('/api/notification/delete', { id: notificationID });
      set({ updateSuccess: true });
    } catch (error) {}
  }
}));
