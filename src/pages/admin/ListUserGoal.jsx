import React, { useState, useEffect } from 'react';

import { Grid, Typography, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import { userService, groupService, goalService, } from '../../services';
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

function ListUserGoal() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [listGroups, setListGroups] = useState([]);
  // const [listGroupDesc, setListGroupDesc] = useState([]);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState([]);

  const columns = [
    { title: 'Usuário', field: 'goalUserID', lookup: { ...listUsers } },
    { title: 'Grupo', field: 'goalGroupID', lookup: { ...listGroups } },
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
    {
      title: 'Tipo Valor',
      field: 'typeValue',
      lookup: { '%': '%', 'R$': 'R$' },
      headerStyle: {
        textAlign: 'center',
        width: '5%',
      },
      cellStyle: {
        textAlign: 'center',
      },
    },
    { title: 'Valor', field: 'value', type: 'numeric' },
  ];

  const rowAdd = (newData, resolve) => {
    let errorList = []
    if (newData.goalUserID === undefined) {
      errorList.push("Por favor, informe um usuário!");
    }
    if (newData.goalGroupID === undefined) {
      errorList.push("Por favor, informe o grupo!");
    }
    if (newData.description === undefined) {
      errorList.push("Por favor, informe uma descrição!");
    }
    if (newData.active === undefined) {
      errorList.push("Por favor, informe se a meta está ativa!");
    }

    if (errorList.length < 1) {
      goalService.createGoalUser(newData)
        .then(res => {
          let dataToAdd = [...tableData];
          dataToAdd.push(newData);
          setTableData([...dataToAdd]);
          setIsError(false);
          setMessages(['Meta criada com sucesso!']);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setMessages([]);
          }, 5000);
          resolve();
          updateListGoals();
        })
        .catch(error => {
          setMessages(['Erro: ' + error.response.data]);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setMessages([]);
          }, 5000);
          console.log('Erro: ' + error);
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
    goalService.updateGoalUser(newData.id, newData)
      .then(res => {
        const dataUpdate = [...tableData];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setTableData([...dataUpdate]);
        setIsError(false);
        setMessages(['Meta atualizada com sucesso!']);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        resolve();
        updateListGoals();
      })
      .catch(error => {
        setMessages(['Erro: ' + error.response.data]);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        console.log('Erro: ' + error);
        resolve();
      })
  };

  const rowDelete = (oldData, resolve) => {
    goalService.deleteGoalUser(oldData.id)
      .then(res => {
        const dataDelete = [...tableData];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setTableData([...dataDelete]);
        setIsError(false);
        setMessages(['Meta excluída com sucesso!']);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        resolve();
        updateListGoals();
      })
      .catch(error => {
        setMessages(['Erro: ' + error.response.data]);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        console.log('Erro: ' + error);
        resolve();
      })
  };

  // const loadGroupDescription = (id) => {
  //   var groupDesc = listGroupDesc.filter(function (id) {
  //     return id = listGroupDesc.id;
  //   });

  //   //setTableData();
  // };

  const updateListGoals = () => {
    userService.getUsers()
      .then(res => {
        let listNames = res.data.reduce(function (acc, cur) {
          acc[cur.id] = cur.name;

          return acc;
        }, {});

        setListUsers(listNames);
      })
      .catch(error => {
        setMessages(['Erro: ' + error.response.data]);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        console.log('Erro: ' + error);
      });

    groupService.getGroups()
      .then(res => {
        let listNames = res.data.reduce(function (acc, cur) {
          acc[cur.id] = cur.name;

          return acc;
        }, {});

        // let listDesc = res.data.reduce(function (acc, cur) {
        //   acc[cur.id] = cur.description;

        //   return acc;
        // }, {});

        setListGroups(listNames);
        // setListGroupDesc(listDesc);
      })
      .catch(error => {
        setMessages(['Erro: ' + error.response.data]);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        console.log('Erro: ' + error);
      });

    goalService.getGoalsUsers()
      .then(res => {
        setTableData(res.data);
      })
      .catch(error => {
        setMessages(['Erro: ' + error.response.data]);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessages([]);
        }, 5000);
        console.log('Erro: ' + error);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    updateListGoals();

    setIsLoading(false);
  }, []);

  return (
    <Grid className={classes.root}>
      <Grid item>
        <Typography variant="h5" align="left" color="textPrimary" component="p">
          Administrador - Lista de Metas de Usuários
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

export { ListUserGoal };
