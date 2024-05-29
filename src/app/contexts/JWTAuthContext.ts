import axios from 'axios';
import { create } from 'zustand';
interface UserInterface {
  id?: number;
  name?: string;
  avatar?: string;
  authorities?: Array<string>;
}
const initialState = {
  name: '',
  user: {} as UserInterface,
  isInitialised: false,
  isAuthenticated: false,
  reset: async () => {},
  login: async (payload: { username: string; password: string }): Promise<any> => {},
  register: async (payload: { email: string; username: string; password: string }) => {},
  logout: async () => {},
  message: '' as string,
  method: 'JWT',
  getEntities: async (filter: string) => {},
  updateSuccess: false,
  entities: [],
  deleteEntity: async (id: number) => {},
  currentLoggedUser: async () => {}
};
type StateType = typeof initialState;

export const useUser = create<StateType>((set) => ({
  ...initialState,

  login: async (payload: { username: string; password: string }) => {
    try {
      const { data: token } = await axios.post('/signin', payload);
      await localStorage.setItem('token', token);

      const { data: user } = await axios.get('/users/current-logged-user');
      set({ user, isAuthenticated: true });
      return 200;
    } catch (error) {}
  },

  currentLoggedUser: async () => {
    try {
      const { data: user } = await axios.get('/users/current-logged-user');
      set({ user, isAuthenticated: true });
    } catch (error) {}
  },
  getEntities: async (filter) => {
    try {
      const { data: token } = await axios.post('/' + filter);
      localStorage.setItem('token', token);

      const { data } = await axios.get('/users/current-logged-user');
      set({ entities: data });
    } catch (error) {}
  },
  logout: async () => {
    try {
      set({ ...initialState });
      localStorage.removeItem('token');
    } catch (error) {}
  },
  register: async (payload: { email: string; username: string; password: string }) => {
    try {
      const response = await axios.post('/auth/register', payload);
      const { user } = response.data;
      set({ user, name: user.firstName });
    } catch (error) {}
  },
  deleteEntity: async (id: number) => {},
  reset: async () => {
    localStorage.removeItem('token');
    set({
      user: {},
      isInitialised: false,
      isAuthenticated: false
    });
  }
}));
