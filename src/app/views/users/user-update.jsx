import { Button, Box, styled } from "@mui/material";
import { React, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import useUser from "app/hooks/useUser";
import { toast } from "react-toastify";
import {
  SUCCESS_CREATE_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
} from "app/utils/constant";
import { LoadingButton } from "@mui/lab";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import axios from "app/config/axios-interceptor";
import { PickList } from "primereact/picklist";

const containerStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

const columnStyle = {
  flex: 1,
  width: "26.5vw",
  marginRight: "1vw",
};

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

export const UserUpdate = (props) => {
  const [state, setState] = useState({ date: new Date() });
  const { createEntity, updateEntity, updateSuccess } = useUser();
  const [loading, setLoading] = useState(false);
  const [loadCorrectRoles, setLoadCorectRoles] = useState(false);

  const [roles] = useState({
    label: props.currentEntity?.roles
      ? props.currentEntity?.roles
      : "ROLE_ADMIN",
  });
  const [listofroles, setlistofroles] = useState([]);
  const [listofSelectedroles, setlistofSelectedroles] = useState([]);

  useEffect(() => {
    if (props.currentEntity) {
      setState(props.currentEntity);
    }
    const init = async () => {
      const { data: rls } = await axios.get("/roles");
      setlistofroles(rls);
    };
    init();
  }, []);

  const handleSubmit = async (event) => {
    setLoading(true);
    state.roles = roles === undefined ? null : roles.label;

		console.log("selected onesJJ", listofSelectedroles)

    if (props.currentEntity) {
      try {
        updateEntity({
					...state,
					roles: listofSelectedroles
				});
      } catch (e) {
        setLoading(false);
      }
    } else {
      try {
        createEntity({
					...state,
					roles: listofSelectedroles,
				});
      } catch (e) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
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

  const {
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    roles: currentRoles,
  } = state;

  useEffect(() => {
    setLoadCorectRoles(true);
    if (Array.isArray(currentRoles) && currentRoles.length > 0) {
      setlistofSelectedroles(currentRoles);
    } else {
      setlistofSelectedroles([]);
    }
    setLoadCorectRoles(false);
  }, [currentRoles]);

  return (
    <div>
      <ContentBox>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <div style={columnStyle}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="username"
                label="Username"
                variant="outlined"
                value={username || ""}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                validators={["required"]}
                sx={{ mb: 3, width: "100%" }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={containerStyle}>
              <div style={columnStyle}>
                {" "}
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={firstName || ""}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  validators={["required"]}
                  sx={{ mb: 3 }}
                />
              </div>
              <div style={columnStyle}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={lastName || ""}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />
              </div>
            </div>
            <br />
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {!state?.id && (
              <div style={containerStyle}>
                <div style={columnStyle}>
                  <TextField
                    fullWidth
                    // sx={{ mb: 4 }}
                    name="password"
                    type="password"
                    label="Password"
                    onChange={handleChange}
                    value={password || ""}
                    errorMessages={["this field is required"]}
                    validators={["required"]}
                  />
                </div>
                <div style={columnStyle}>
                  <TextField
                    fullWidth
                    style={{ marginBottom: 4 }}
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    onChange={handleChange}
                    value={confirmPassword || ""}
                    validators={["required", "isPasswordMatch"]}
                    errorMessages={[
                      "this field is required",
                      "password didn't match",
                    ]}
                  />
                </div>
              </div>
            )}
            <br />
          </div>

          {!loadCorrectRoles && (
            <PickList
              dataKey="id"
              source={listofroles.filter((r) => !listofSelectedroles.map(x=>x.id).includes(r.id))}
              target={listofSelectedroles}
              onChange={(event) => {
                setlistofroles(event.source);
                setlistofSelectedroles(event.target);
              }}
              itemTemplate={(item) => item.name}
              sourceHeader="Available"
              targetHeader="Selected"
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="left-btn" style={{ marginTop: 2 }}>
              <StyledButton
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

export default UserUpdate;
