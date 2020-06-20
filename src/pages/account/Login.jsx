import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormHelperText,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { MailOutline, LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';

import { accountService } from '../../services';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    width: '100%',
  },
  outlinedRoot: {
    '&:hover': {
      borderColor: 'red',
    },
  },
  emailInput: {
    width: 300,
  },
  paper: {
    padding: '1rem',
  },
  password: {
    width: 300,
    '&::placeholder': {
      fontStyle: 'italic',
      paddingLeft: '0.5rem',
    },
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 16,
    padding: '6px 12px',
    width: 200,
    lineHeight: 1.5,
  },
  forgotLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function Login({ history, location }) {
  const classes = useStyles();

  const [passwordType, setPasswordType] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('O e-mail é inválido!')
        .required('O e-mail é obrigatório!'),
      password: Yup.string()
        .min(6, 'A senha precisa conter no mínimo 6 caracteres!')
        .required('É necessário informar a senha!'),
    }),
    onSubmit: (values) => {
      console.log(values);
      accountService.login(values.email, values.password);
      const { from } = location.state || { from: { pathname: '/' } };
      history.push(from);
    },
  });

  const handleClickVisibility = () => {
    setVisibility(!visibility);
    setPasswordType(!passwordType);
  };

  return (
    <Grid
      container
      className={classes.root}
      data-testid="login"
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4" data-testid="login-title">
                Login
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="email"
                name="email"
                variant="outlined"
                placeholder="email"
                className={classes.emailInput}
                onChange={handleChange}
                value={values.email}
                InputProps={{
                  classes: {
                    input: classes.outlinedRoot,
                  },
                  startAdornment: <MailOutline color="primary" />,
                }}
                error={touched.email && errors.email ? true : null}
              />
              <FormHelperText error={errors.email}>{errors.email}</FormHelperText>
            </Grid>
            <Grid item>
              <TextField
                id="password"
                name="password"
                variant="outlined"
                size="small"
                placeholder="senha"
                onChange={handleChange}
                value={values.password}
                className={classes.password}
                type={passwordType ? 'password' : 'text'}
                InputProps={{
                  classes: { input: classes.password },
                  startAdornment: <LockOutlined color="primary" />,
                  endAdornment: visibility ? (
                    <Visibility color="primary" onClick={handleClickVisibility} />
                  ) : (
                    <VisibilityOff color="primary" onClick={handleClickVisibility} />
                  ),
                }}
                error={touched.password && errors.password ? true : null}
              />
              <FormHelperText error={errors.password}>{errors.password}</FormHelperText>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                color="primary"
                size="medium"
                variant="contained"
                className={classes.button}
              >
                Entrar
              </Button>
            </Grid>
            <Grid item>
              <Typography>
                <Link to="forgotpassword" className={classes.forgotLink}>
                  Esqueceu a senha?
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export { Login };
