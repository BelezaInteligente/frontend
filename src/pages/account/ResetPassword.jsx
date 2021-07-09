import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Button, Typography, Paper, FormHelperText, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff, LockOutlined } from '@material-ui/icons';
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
  homeLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function ResetPassword(path) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordType, setPasswordType] = useState(true);
  const [visibility, setVisibility] = useState(false);

  let urlToken = {};
  window.location.search.split('&').toString().substr(1).split(",").forEach(item => {
    urlToken[item.split("=")[0]] = decodeURIComponent(item.split("=")[1]) ? item.split("=")[1] : "No query strings available";
  });


  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(6, 'A senha precisa conter no mínimo 6 caracteres!')
        .required('É necessário informar a senha!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas não conferem!')
        .required('É necessário informar a senha novamente!'),
    }),
    onSubmit: (values) => {
      accountService.resetPassword(urlToken.token, values)
        .then(() => {
          setIsError(false);
          setMessage("Senha alterada com sucesso!");
          setOpen(true);

          setTimeout(() => {
            setOpen(false);
            setMessage('');
          }, 5000);
        })
        .catch(error => {
          setIsError(true);
          setMessage(error.message);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setMessage('');
          }, 5000);
        })
    }
  });

  const handleClickVisibility = () => {
    setVisibility(!visibility);
    setPasswordType(!passwordType);
  };

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4" color="textPrimary">
                Nova senha
            </Typography>
            </Grid>

            <Grid item>
              <TextField
                id="password"
                name="password"
                label="Senha Nova"
                variant="outlined"
                size="small"
                placeholder="Senha nova"
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
              <FormHelperText
                error={Boolean(touched.password && errors.password)}
              >
                {touched.password && errors.password ? errors.password : ''}
              </FormHelperText>
            </Grid>
            <Grid item>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar Senha Nova"
                variant="outlined"
                size="small"
                placeholder="Confirmar senha"
                onChange={handleChange}
                value={values.confirmPassword}
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
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              />
              <FormHelperText
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              >
                {touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
              </FormHelperText>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                color="primary"
                size="medium"
                variant="contained"
                className={classes.button}
              >Salvar Senha
            </Button>
              <Link to="login" className={classes.homeLink}>
                <Button
                  type="submit"
                  color="primary"
                  size="medium"
                  variant="contained"
                  className={classes.button}
                >
                  Login
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
        <Collapse in={open}>
          {
            isError ? (
              <Alert severity='error'>
                <AlertTitle>Erro</AlertTitle>
                Não foi possível alterar a senha — <strong>{message}!</strong>
              </Alert>
            ) : (
                <Alert severity='success'>
                  <AlertTitle>Sucesso</AlertTitle>
                  Senha alterada com Sucesso
              </Alert>
              )
          }
        </Collapse>
      </Paper>
    </Grid>
  );
}

export { ResetPassword };