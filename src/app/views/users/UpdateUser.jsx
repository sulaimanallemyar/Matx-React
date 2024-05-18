import { Button, Box, styled } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import useUser from 'app/hooks/useUser';
import { toast } from 'react-toastify';
import { SUCCESS_CREATE_MESSAGE, SUCCESS_UPDATE_MESSAGE } from 'app/utils/constant';
import { LoadingButton } from '@mui/lab';
import { Autocomplete } from '@mui/material';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const systemUserRoles = [{ label: 'ROLE_ADMIN' }, { label: 'ROLE_USER' }];

export const UserUpdate = (props) => {
  const [state, setState] = useState({ date: new Date() });
  const { createEntity, updateEntity, updateSuccess } = useUser();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState({
    label: props.currentEntity?.roles ? props.currentEntity?.roles : 'ROLE_ADMIN'
  });

  useEffect(() => {
    if (props.currentEntity) {
      setState(props.currentEntity);
    }
  }, []);

  const handleSubmit = (event) => {
    setLoading(true);
    state.roles = roles === undefined ? null : roles.label;

    if (props.currentEntity) {
      try {
        updateEntity(state);
      } catch (e) {
        setLoading(false);
      }
    } else {
      try {
        createEntity(state);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDropdownChange = (event, newValue) => {
    setRoles(newValue);
  };

  useEffect(() => {
    if (updateSuccess) {
      if (props.currentEntity) {
        toast.success(SUCCESS_UPDATE_MESSAGE);
      } else {
        toast.success(SUCCESS_CREATE_MESSAGE);
      }

      props.closeDialog();
    }
  }, [updateSuccess]);

  const { username, firstName, lastName, password, confirmPassword } = state;

  return (
    <div>
      <ContentBox>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <TextField
            fullWidth
            size="small"
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            value={username || ''}
            onChange={handleChange}
            errorMessages={['this field is required']}
            validators={['required']}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="firstName"
            label="First Name"
            variant="outlined"
            value={firstName || ''}
            onChange={handleChange}
            errorMessages={['this field is required']}
            validators={['required']}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="lastName"
            label="Last Name"
            variant="outlined"
            value={lastName || ''}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <AutoComplete
            value={roles}
            sx={{ width: '100%' }}
            options={systemUserRoles}
            onChange={handleDropdownChange}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="USER ROLE" variant="outlined" required />
            )}
          />

          <TextField
            fullWidth
            sx={{ mb: 4 }}
            name="password"
            type="password"
            label="Password"
            onChange={handleChange}
            value={password || ''}
            errorMessages={['this field is required']}
            validators={['required']}
          />

          <TextField
            fullWidth
            style={{ marginBottom: 4 }}
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            onChange={handleChange}
            value={confirmPassword || ''}
            validators={['required', 'isPasswordMatch']}
            errorMessages={['this field is required', "password didn't match"]}
          />

          <div className="left-btn">
            <StyledButton variant="contained" color="inherit" onClick={() => props.closeDialog()}>
              Close
            </StyledButton>
          </div>
          <div className="right-btn">
            <LoadingButton
              type="submit"
              color="primary"
              loading={loading}
              variant="contained"
              sx={{ my: 2 }}
            >
              Submit
            </LoadingButton>
          </div>
        </ValidatorForm>
      </ContentBox>
    </div>
  );
};

export default UserUpdate;
