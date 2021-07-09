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
  Collapse
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MailOutline } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
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
  button: {
    margin: theme.spacing(1),
    fontSize: 16,
    padding: '6px 12px',
    width: 200,
    lineHeight: 1.5,
  },
  cancelLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function ForgotPassword({ history, location }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('O e-mail é inválido!')
        .required('O e-mail é obrigatório!'),
    }),
    onSubmit: (values) => {
      setOpen(true);
      accountService.forgotPassword(values.email)
        .then(() => {
          values.email = '';
          setTimeout(() => {
            setOpen(false)
          }, 5000);
        })
        .catch(error => {
          setOpen(true);
          values.email = '';
          setTimeout(() => {
            setOpen(false);
          }, 5000);
        })
    },
  });

  return (
    <Grid
      container
      className={classes.root}
      data-testid="forgotpassword"
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4" data-testid="forgot-password">
                Esqueci a senha
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
                onChange={handleChange}
                value={values.email}
                className={classes.emailInput}
                InputProps={{
                  classes: {
                    input: classes.outlinedRoot,
                  },
                  startAdornment: <MailOutline color="primary" />,
                }}
                error={errors.email}
              />
              <FormHelperText error={errors.email}>{errors.email}</FormHelperText>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                color="primary"
                size="medium"
                variant="contained"
                className={classes.button}
              >
                Enviar
              </Button>
              <Link to="login" className={classes.cancelLink}>
                <Button
                  type="submit"
                  color="primary"
                  size="medium"
                  variant="contained"
                  className={classes.button}
                >
                  Voltar
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
        <Collapse in={open}>
          <Alert severity="success">
            <AlertTitle>Sucesso</AlertTitle>
            Uma nova senha foi enviadao para o seu email — <strong>{values.email}!</strong>
          </Alert>
        </Collapse>
      </Paper>
    </Grid>
  );
}

export { ForgotPassword };
