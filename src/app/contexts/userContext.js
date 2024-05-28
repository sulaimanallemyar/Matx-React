import { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = { entities: [], updateSuccess: false, entity: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_ENTITIES': {
      return { ...state, entities: action.payload, updateSuccess: false };
    }
    case 'CREATE_ENTITY': {
      return { ...state, entity: action.payload, updateSuccess: true };
    }
    case 'UPDATE_ENTITY': {
      return { ...state, entity: action.payload, updateSuccess: true };
    }
    case 'DELETE_ENTITY': {
      return { ...state, notifications: action.payload, updateSuccess: true };
    }
    default:
      return state;
  }
};

const UserContext = createContext({
  ...initialState,
  getEntity: () => {},
  getEntities: () => {},
  createEntity: () => {},
  updateEntity: () => {},
  deleteEntity: () => {}
});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteEntity = async (notificationID) => {
    try {
      const res = await axios.delete('/users/' + notificationID);
      dispatch({ type: 'DELETE_ENTITY', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const getEntity = async (id) => {
    console.log('getting single ent');
    try {
      const res = await axios.get('/users/' + id);
      dispatch({ type: 'LOAD_ENTITIES', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const getEntities = async () => {
    try {
      const res = await axios.get('/users?sort=id,desc');
      dispatch({ type: 'LOAD_ENTITIES', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const createEntity = async (notification) => {
    try {
      const res = await axios.post('/users', { ...notification });
      dispatch({ type: 'CREATE_ENTITY', payload: { ...res.data } });
    } catch (e) {
      console.error(e);
    }
  };

  const updateEntity = async (notification) => {
    try {
      const res = await axios.put('/users', notification);
      dispatch({ type: 'UPDATE_ENTITY', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        getEntities,
        getEntity,
        deleteEntity,
        createEntity,
        updateEntity
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
