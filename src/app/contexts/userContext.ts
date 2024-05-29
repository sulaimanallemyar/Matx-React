import axios from 'axios';
import { create } from 'zustand';
const initialState = {
  entities: [],
  updateSuccess: false,
  entity: {},
  getEntity: async (id: number) => {},
  getEntities: async () => {},
  createEntity: async (notification: any) => {},
  updateEntity: async (notification: any) => {},
  deleteEntity: async (notificationID: number) => {}
};
type StateType = typeof initialState;

export const useUser = create<StateType>((set) => ({
  ...initialState,
  getEntity: async (id: number) => {
    try {
      const res = await axios.get('/users/' + id);
      set({ entity: res.data });
    } catch (error) {}
  },
  getEntities: async () => {
    try {
      const res = await axios.get('/users?sort=id,desc');
      set({ entities: res.data });
    } catch (error) {}
  },
  createEntity: async (notification: any) => {
    try {
      await axios.post('/users', notification);
      set({ updateSuccess: true });
    } catch (error) {}
  },
  updateEntity: async (notification: any) => {
    try {
      await axios.put('/users', notification);
      set({ updateSuccess: true });
    } catch (error) {}
  },
  deleteEntity: async (notificationID: number) => {
    try {
      await axios.delete('/users/' + notificationID);
      set({ updateSuccess: true });
    } catch (error) {}
  }
}));
