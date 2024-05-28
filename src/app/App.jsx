import { CssBaseline } from '@mui/material';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
// import '../fake-db';
import { UserProvider } from './contexts/userContext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Router } from './routes';
import axiosInterceptor from '../app/config/axios-interceptor';
// axiosInterceptor(() => {
//   localStorage.removeItem('token');
// });

const App = () => {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        {/* <MatxTheme> */}
        {/* <UserProvider>
            <CssBaseline /> */}
        <Router />
        {/* {content} */}
        {/* </UserProvider>
        </MatxTheme> */}
      </AuthProvider>
    </PrimeReactProvider>
  );
};

export default App;
