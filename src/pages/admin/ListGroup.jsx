import React, { useState, useEffect } from 'react';

import { Grid, Typography, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import { groupService } from '../../services';
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

const columns = [
  { title: "id", field: "id", hidden: true },
  {
    title: 'Grupo',
    field: 'name',
  },
  {
    title: 'Descrição da Meta',
    field: 'description',
    headerStyle: {
      width: '70%',
    },
    cellStyle: {
      width: '70%',
    },
  },
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
];

function ListGroup() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState([]);

  const rowAdd = (newData, resolve) => {
    let errorList = []
    if (newData.name === undefined) {
      errorList.push("Por favor, informe um nome para o grupo!");
    }
    if (newData.description === undefined) {
      errorList.push("Por favor, informe a descrição do grupo!");
    }
    if (newData.active === undefined) {
      errorList.push("Por favor, informe se o grupo está ativo!");
    }

    if (errorList.length < 1) {
      groupService.createGroup(newData)
        .then(res => {
          let dataToAdd = [...tableData];
          dataToAdd.push(newData);
          setTableData([...dataToAdd]);
          setIsError(false);
          setMessages(['Grupo criado com sucesso!']);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setMessages([]);
          }, 5000);
          resolve();
          updateListGroups();
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
    groupService.updateGroup(newData.id, newData)
      .then(res => {
        const dataUpdate = [...tableData];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setTableData([...dataUpdate]);
        setIsError(false);
        setMessages(['Grupo atualizado com sucesso!']);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        resolve();
        updateListGroups();
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
    groupService.deleteGroup(oldData.id)
      .then(res => {
        const dataDelete = [...tableData];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setTableData([...dataDelete]);
        setIsError(false);
        setMessages(['Grupo excluído com sucesso!']);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        resolve();
        updateListGroups();
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

  const updateListGroups = () => {

    groupService.getGroups()
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

    updateListGroups();

    setIsLoading(false);
  }, []);

  return (
    <Grid className={classes.root}>
      <Grid item>
        <Typography variant="h5" align="left" color="textPrimary" component="p">
          Administrador - Lista de Grupos
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

export { ListGroup };
