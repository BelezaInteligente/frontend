import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Grid, TextField, Button, Typography, Paper, FormHelperText, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';

import { accountService, userService } from '../../services';
import { Role } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  inputField: {
    margin: '6px',
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 16,
    padding: '6px 12px',
    width: 180,
    lineHeight: 1.5,
  },
}));

function Details() {
  const classes = useStyles();
  const user = accountService.userValue;
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordType, setPasswordType] = useState(true);
  const [visibility, setVisibility] = useState(false);

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
    onSubmit: (values, { resetForm }) => {
      userService.updatePassword(user.id, values)
        .then(() => {
          setIsError(false);
          setMessage("Senha alterada com sucesso!");
          setOpen(true);
          resetForm({ values: '' });

          setTimeout(() => {
            setOpen(false);
            setMessage('');
          }, 5000);
        })
        .catch(error => {
          setIsError(true);
          resetForm({ values: '' });
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
    <Paper>
      <form onSubmit={handleSubmit}>
        <Grid className={classes.root}>
          <Grid item>
            <Typography variant="h5" align="left" color="textPrimary" component="p">
              Usuário - Perfil {user.role === Role.Admin && "Administrador"}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              disabled
              fullWidth
              id="name-disabled"
              label="Usuário"
              size="small"
              className={classes.inputField}
              defaultValue={user.name}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              disabled
              fullWidth
              id="email-disabled"
              label="Email"
              size="small"
              className={classes.inputField}
              defaultValue={user.email}
              variant="outlined"
            />
          </Grid>
          <Grid container>
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
                label="Confirmar Senha"
                variant="outlined"
                size="small"
                placeholder="Confirmar senha"
                onChange={handleChange}
                value={values.confirmPassword}
                className={classes.inputField}
                type={passwordType ? 'password' : 'text'}
                InputProps={{
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
          </Grid>
          <Grid container justify="flex-end">
            <Button
              type="submit"
              color="primary"
              size="medium"
              variant="contained"
              className={classes.button}
            >Salvar Senha</Button>
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
  );
}

export { Details };