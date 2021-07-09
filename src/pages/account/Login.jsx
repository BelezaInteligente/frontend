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
  Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MailOutline, LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';

import { accountService } from '../../services';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  inputField: {
    width: 300,
  },
  paper: {
    padding: '1rem',
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 16,
    padding: '6px 12px',
    width: 180,
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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

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
      accountService.login(values)
        .then(() => {
          //const { from } = location.state || { from: { pathname: '/' } };
          history.push('/dashboard');
        })
        .catch(error => {
          setMessage(error.message);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setMessage('');
          }, 5000);
        })
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
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                size="small"
                placeholder=" email@email.com.br"
                className={classes.inputField}
                onChange={handleChange}
                value={values.email}
                InputProps={{
                  startAdornment: <MailOutline color="primary" />,
                }}
                error={touched.email && errors.email ? true : ''}
              />
              <FormHelperText error={errors.email}>{errors.email}</FormHelperText>
            </Grid>
            <Grid item>
              <TextField
                id="password"
                name="password"
                label="Senha"
                variant="outlined"
                size="small"
                placeholder=" Senha"
                onChange={handleChange}
                value={values.password}
                className={classes.inputField}
                type={passwordType ? 'password' : 'text'}
                InputProps={{
                  startAdornment: <LockOutlined color="primary" />,
                  endAdornment: visibility ? (
                    <Visibility color="primary" onClick={handleClickVisibility} />
                  ) : (
                      <VisibilityOff color="primary" onClick={handleClickVisibility} />
                    ),
                }}
                error={Boolean(touched.password && errors.password)}
              />
              <FormHelperText error={Boolean(touched.password && errors.password)}>
                {touched.password && errors.password ? errors.password : ''}
              </FormHelperText>
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
        <Collapse in={open}>
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            Não foi possível realizar o login — <strong>{message}!</strong>
          </Alert>
        </Collapse>
      </Paper>
    </Grid>
  );
}

export { Login };
