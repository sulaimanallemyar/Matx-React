import { createContext, useEffect, useReducer } from 'react';
import { MatxLoading } from 'app/components';
import axios from 'axios';

const initialState = {
  user: null,
  isInitialised: true,
  isAuthenticated: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user: { ...user, name: user.firstName } };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }
    case 'UPDATE': {
      const data = action.payload;
      return { ...state, ...data };
    }
    case 'RESET': {
      return initialState;
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  message: '',
  login: () => {},
  logout: () => {},
  register: () => {},
  resetState: () => {},
  currentLoggedUser: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    try {
      const { data: token, status } = await axios.post('/signin', { username: email, password });

      localStorage.setItem('token', token);

      const { data: user } = await axios.get('/users/current-logged-user');
      dispatch({ type: 'LOGIN', payload: { user } });
      return { status: 200 };
    } catch (error) {
      dispatch({
        type: 'UPDATE',
        payload: { message: 'Invalid username or password, please try again.' }
      });
    }
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user, name: user.firstName } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const resetState = () => {
    dispatch({ type: 'RESET' });
  };
  const currentLoggedUser = async () => {
    try {
      const { data } = await axios.get('/users/current-logged-user');

      dispatch({
        type: 'INIT',
        payload: { isAuthenticated: true, user: { ...data, name: data.firstName } }
      });
    } catch (err) {
      dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
    }
  };
  useEffect(() => {}, []);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider
      value={{ ...state, method: 'JWT', login, logout, register, currentLoggedUser, resetState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
