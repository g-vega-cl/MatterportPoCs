import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import './Login.scss';
import { TextField, Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { AuthenticationStore } from '../../store';
import AuthenticationService from '../../../../services/authenticationService';

const LogIn: React.FC<any> = (props) => {
  const authStore = useContext(AuthenticationStore);
  const history = useHistory();

  const goToHome = () => {
    history.push('/');
  };

  const signIn = (username: string, password: string) => {
    AuthenticationService.logIn(username, password).then((res) => {
      authStore.dispatch({ type: 'login', payload: res });
      goToHome();
    });
  };

  const initialFormValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  return (
    <div className="login">
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          signIn(values.username, values.password);
        }}
      >
        {({ submitForm, values, handleChange, handleBlur, dirty, isValid, errors }) => {
          return (
            <div className="login-form">
              <TextField
                id="username"
                label="User name"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                size="small"
                margin="dense"
                fullWidth
                error={!!errors.username}
                helperText={!!errors.username ? errors.username : ''}
              />
              <TextField
                id="password"
                label="Password"
                value={values.password}
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                size="small"
                margin="dense"
                fullWidth
                error={!!errors.password}
                helperText={!!errors.password ? errors.password : ''}
              />
              <Button
                disabled={!isValid || !dirty}
                onClick={submitForm}
                variant="contained"
                className="main-button"
              >
                Sign In
              </Button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default LogIn;
