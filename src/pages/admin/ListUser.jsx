import React, { useState, useEffect } from 'react';

import { Grid, Typography, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import { userService } from '../../services';
import AppTable from '../../components/Table';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 16,
    padding: '6px 12px',
    width: 200,
    lineHeight: 1.5,
  },
}));

function ListUser() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState([]);

  const [columns] = useState([
    { title: 'Usuário', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Nome', field: 'firstName' },
    { title: 'Sobrenome', field: 'lastName' },
    {
      title: 'Ativo',
      field: 'active',
      lookup: { true: 'Sim', false: 'Não' },
      headerStyle: {
        textAlign: 'center',
      },
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Permissão',
      field: 'role',
      lookup: { 'Admin': 'Admin', 'User': 'User' },
    },
  ]);

  const rowAdd = (newData, resolve) => {
    let errorList = []
    if (newData.name === undefined) {
      errorList.push("Por favor, informe um nome!");
    }
    if (newData.email === undefined) {
      errorList.push("Por favor, informe o email!");
    }
    if (newData.active === undefined) {
      errorList.push("Por favor, informe se o usuário está ativo!");
    }
    if (newData.role === undefined) {
      errorList.push("Por favor, informe a permissão do usuário!");
    }

    if (errorList.length < 1) {
      userService.createUser(newData)
        .then(res => {
          let dataToAdd = [...tableData];
          dataToAdd.push(newData);
          setTableData([...dataToAdd]);
          setIsError(false);
          setMessages(['Usuário criado com sucesso!']);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setMessages([]);
          }, 5000);
          resolve();
          updateListUsers();
        })
        .catch(error => {
          setIsError(true);
          setMessages(['Erro: ' + error.response.data]);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setMessages([]);
          }, 5000);
        })
    } else {
      setIsError(true);
      setMessages(['Erro: ' + errorList]);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        setMessages([]);
      }, 5000);
      resolve();
    }
  };

  const rowUpdate = (newData, oldData, resolve) => {
    userService.updateUser(newData.id, newData)
      .then(res => {
        const dataUpdate = [...tableData];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setTableData([...dataUpdate]);
        setIsError(false);
        setMessages(['Usuário atualizado com sucesso!']);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        resolve();
        updateListUsers();
      })
      .catch(error => {
        setIsError(true);
        setMessages(['Erro: ' + error.response.data]);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        console.log('Erro: ' + error.response.data);
        resolve();
      })
  }

  const rowDelete = (oldData, resolve) => {
    userService.deleteUser(oldData.id)
      .then(res => {
        const dataDelete = [...tableData];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setTableData([...dataDelete]);
        setIsError(false);
        setMessages(['Usuário excluído com sucesso!']);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        resolve();
        updateListUsers();
      })
      .catch(error => {
        setIsError(true);
        setMessages(['Erro: ' + error.response.data]);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        console.log('Erro: ' + error.response.data);
        resolve();
      })
  };

  const updateListUsers = () => {

    userService.getUsers()
      .then(res => {
        setTableData(res.data);
      })
      .catch(error => {
        setIsError(true);
        setMessages(['Erro: ' + error.response.data]);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        console.log('Erro: ' + error.response.data);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setMessages([]);
    setOpen(false);

    updateListUsers();

    setIsLoading(false);
  }, []);

  return (
    <Grid className={classes.root}>
      <Grid item>
        <Typography variant="h5" align="left" color="textPrimary" component="p">
          Administrador - Lista de Usuários
        </Typography>
      </Grid>
      <Grid item>
        <AppTable
          data={tableData}
          columns={columns}
          isLoading={isLoading}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                rowAdd(newData, resolve)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                rowUpdate(newData, oldData, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                rowDelete(oldData, resolve);
              })
          }}
        />
        <Collapse in={open}>
          {isError ?
            <Alert severity="error">
              {messages.map((msg, i) => {
                return <div key={i}>{msg}</div>
              })}
            </Alert>
            :
            <Alert severity="success">
              <AlertTitle>Sucesso</AlertTitle>
              {messages.map((msg, i) => {
                return <div key={i}>{msg}</div>
              })}
            </Alert>
          }
        </Collapse>
      </Grid>
    </Grid>
  );
}

export { ListUser };
