import { create } from 'zustand';
import { merge } from 'lodash';
import { MatxLayoutSettings } from '../components/MatxLayout/settings';

const initialState = {
  settings: MatxLayoutSettings,
  updateSettings: (payload: any) => {}
};
type StateType = typeof initialState;
// Create the store
export const useSettingsStore = create<StateType>((set) => ({
  ...initialState,
  updateSettings: (update = {}) =>
    set((state: StateType) => ({
      settings: merge({}, state.settings, update)
    }))
}));
