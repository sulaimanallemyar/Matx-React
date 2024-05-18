import { Button, Box, styled } from '@mui/material';
import { React, useEffect, useState, useRef } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import useUser from 'app/hooks/useUser';
import { toast } from 'react-toastify';
import { SUCCESS_CREATE_MESSAGE, SUCCESS_UPDATE_MESSAGE } from 'app/utils/constant';
import { LoadingButton } from '@mui/lab';
import { Autocomplete } from '@mui/material';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { init } from 'echarts';
import axios from 'app/config/axios-interceptor';
import { ro } from 'date-fns/locale';

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const columnStyle = {
  flex: 1,
  width: '26.5vw',
  marginRight: '1vw'
};

const TextField = styled(TextValidator)(() => ({
  // flex: 1,
  // flexGrow: 1,
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

export const UpdateRole = (props) => {
  const clsRef = useRef();
  const [state, setState] = useState({ date: new Date() });
  const { createEntity, updateEntity, updateSuccess } = useUser();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState({
    label: props.currentEntity?.roles ? props.currentEntity?.roles : 'ROLE_ADMIN'
  });
  const [roleInstance, setroleInstance] = useState(null);
  const [listoperms, setlistoperms] = useState([]);
  const [listofSelectedperms, setlistofSelectedperms] = useState([]);

  useEffect(() => {
    if (props.id) {
      const getrole = async () => {
        const { data } = await axios.get('/role/' + props.id);
        setroleInstance(data);
      };
      getrole();
    }
    const init = async () => {
      const { data: rls } = await axios.get('/permissions');
      setlistoperms(rls);
    };
    init();
  }, []);

  useEffect(() => {
    if (Array.isArray(props.role?.permissions) && props.role?.permissions.length > 0) {
      props.role?.permissions.map((r) => setlistofSelectedperms((c) => [...c, r.id]));
    }
  }, [props.role]);

  const handleSubmit = async (event) => {
    setLoading(true);
    if (!props.role) {
      await axios.post('/roles', {
        name: event.target.name.value,
        description: event.target.description.value,
        permissions: listoperms.filter((p) => listofSelectedperms.includes(p.id))
      });
    } else {
      await axios.put('/roles/' + props.role.id, {
        id: props.role.id,
        name: event.target.name.value,
        description: event.target.description.value,
        permissions: listoperms.filter((p) => listofSelectedperms.includes(p.id))
      });
    }

    setLoading(false);
    props.reloadRoles();
    clsRef.current.click();
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

  const { username, firstName, lastName, password, confirmPassword, roles: currentRoles } = state;
  useEffect(() => {
    if (Array.isArray(currentRoles) && currentRoles.length > 0) {
      setlistofSelectedperms(currentRoles.map((r) => r.id));
    } else {
      setlistofSelectedperms([]);
    }
  }, [currentRoles]);

  return (
    <div>
      <ContentBox>
        <h3>Role</h3>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <div style={containerStyle}>
              <div style={columnStyle}>
                {' '}
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="name"
                  label="Name"
                  variant="outlined"
                  defaultValue={props.role?.name || ''}
                  onChange={handleChange}
                  // errorMessages={['this field is required']}
                  // validators={['required']}
                  sx={{ mb: 3 }}
                />
              </div>
              <div style={columnStyle}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="description"
                  label="Description"
                  variant="outlined"
                  defaultValue={props.role?.description || ''}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />
              </div>
            </div>
            <br />
          </div>

          <DualListBox
            options={listoperms.map((r) => ({ value: r.id, label: r.action }))}
            selected={listofSelectedperms}
            onChange={(newValue) => setlistofSelectedperms(newValue)}
          />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div className="left-btn" style={{ marginTop: 2 }}>
              <StyledButton
                ref={clsRef}
                variant="contained"
                color="inherit"
                onClick={() => props.closeDialog()}
              >
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
          </div>
        </ValidatorForm>
      </ContentBox>
    </div>
  );
};

export default UpdateRole;
