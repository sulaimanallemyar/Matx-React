import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './auth/private-routes';
// import '../fake-db';
import { lazy } from 'react';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import UsersList from './views/users/ListUsers';
import ListRoles from './views/users/listRoles';
import OverallReport from './views/report/report';
import Index from './views/home/Index';
import axiosInterceptor from '../app/config/axios-interceptor';
import useAuth from './hooks/useAuth';
import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { MatxTheme } from './components';
// import '../fake-db';
import { UserProvider } from './contexts/userContext';
import 'primereact/resources/primereact.min.css';
// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
// const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
export const Router = () => {
  const { resetState, currentLoggedUser, user } = useAuth();
  useEffect(() => {
    axiosInterceptor(() => {
      localStorage.removeItem('token');
      resetState();
    });
  }, []);

  useEffect(() => {
    console.log('2345678');
    currentLoggedUser();
  }, []);
  console.log({ user });
  return (
    <MatxTheme>
      <UserProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="*" element={<AuthLayout />} />
          </Route>
          <Route path="/session/404" element={<NotFound />} />
          <Route path="/session/signin" element={<JwtLogin />} />
          <Route path="/session/signup" element={<JwtRegister />} />
          <Route path="/session/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </MatxTheme>
  );
};

const AuthLayout = () => {
  // 1. to hide or show these routes in sidebar use file
  // MatxVerticalNav
  // 2. MaxtLaout is used to handle the overall layout of admin
  // panel and show/hide the routes based on the user perms
  return (
    <>
      <MatxLayout>
        <Routes>
          <Route
            path="/dashboard/default"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/list"
            element={
              <PrivateRoute>
                <UsersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <OverallReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/roles/list"
            element={
              <PrivateRoute>
                <ListRoles />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Index />} />
        </Routes>
      </MatxLayout>
    </>
  );
};
