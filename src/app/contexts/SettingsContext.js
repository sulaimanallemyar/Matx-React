
import { create } from 'zustand';
import { createContext, useState } from 'react';
import { merge } from 'lodash';
import { MatxLayoutSettings } from 'app/components/MatxLayout/settings';



const initialState = {
  settings: MatxLayoutSettings,
  updateSettings: () => {},
};

// Create the store
export const useSettingsStore = create((set) => ({
 ...initialState,
  updateSettings: (update = {}) => set((state) => ({
   ...state,
    settings: merge({}, state.settings, update),
  })),
}));
