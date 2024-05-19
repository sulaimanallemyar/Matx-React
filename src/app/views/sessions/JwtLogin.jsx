import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/material';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import { useRef } from 'react';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  username: null,
  password: null,
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Password must be 5 character length')
    .required('Password is required!'),
  username: Yup.string().required('Username is required!')
});

const JwtLogin = () => {
  const navigate = useNavigate();
	 const toastRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated, message } = useAuth();

  const handleFormSubmit = async (values) => {
    // setLoading(true);

    try {
      console.log('send values of login: ', values.username, values.password);
      const response = await login(values.username, values.password);
			if (response.status === 200){
				navigate('/dashboard');
			}
    } catch (e) {
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (message?.length) {
      // alert('Invaild login');
			toastRef.current.show({ 
				severity: 'error', 
				summary: 'Error', 
				detail: 'Invalid credentials, please try again.',
			});
      setLoading(false);
    }
  }, [message]);

  return (
    <JWTRoot>
    <div className="bg-blue-200"></div>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/login.png" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox sx={{ marginTop: '100px' }}>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && errors.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Login
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
		 <Toast ref={toastRef} />
    </JWTRoot>
  );
};

export default JwtLogin;
