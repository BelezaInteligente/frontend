import React, { useState, useEffect } from 'react';

import { Grid, Typography, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import { accountService, groupService, goalService } from '../../services';
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

function ListGoal() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [listGroups, setListGroups] = useState([]);
  const user = accountService.userValue;

  const columns = [
    { title: "id", field: "id", hidden: true },
    { title: 'Usuário', field: 'goalUserID', hidden: true },
    { title: 'Grupo', field: 'goalGroupID', lookup: { ...listGroups }, editable: 'never' },
    {
      title: 'Descrição da Meta',
      field: 'description',
      editable: 'never',
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
      editable: 'onUpdate',
      lookup: { '%': '%', 'R$': 'R$' },
      headerStyle: {
        textAlign: 'center',
        width: '5%',
      },
      cellStyle: {
        textAlign: 'center',
      },
    },
    { title: 'Valor', field: 'value', type: 'numeric', editable: 'onUpdate' },
  ];

  const rowUpdate = (newData, oldData, resolve) => {
    let errorList = [];

    if (newData.active === undefined) {
      errorList.push("Por favor, informe se a meta está ativa!");
    };

    if (errorList.length < 1) {
      goalService.updateGoalUser(newData.id, newData)
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
          updateListGoals();
        })
        .catch(error => {
          setIsError(true);
          setMessages(['Erro: ' + error.response.data]);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setMessages([]);
          }, 5000);
          console.log('Erro: ' + error);
          resolve();
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

  const updateListGoals = () => {

    groupService.getGroups()
      .then(res => {
        let listNames = res.data.reduce(function (acc, cur) {
          acc[cur.id] = cur.name;

          return acc;
        }, {});

        setListGroups(listNames);
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

    goalService.getGoalUserById(user.id)
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

    updateListGoals();

    setIsLoading(false);
  }, []);

  return (
    <Grid className={classes.root}>
      <Grid item>
        <Typography variant="h5" align="left" color="textPrimary" component="p">
          Usuário - Metas
        </Typography>
      </Grid>
      <Grid item>
        <AppTable
          data={tableData}
          columns={columns}
          isLoading={isLoading}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                rowUpdate(newData, oldData, resolve);
              }),
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

export { ListGoal };
