import React from 'react';

import { Typography } from '@material-ui/core';

import { accountService } from '../../services';


function Home() {
  const user = accountService.userValue;

  return (
    <>
      <Typography variant="h5" align="left" color="textPrimary" component="p">
        Bem vindo,
      </Typography>
      <Typography variant="h5" align="left" color="textSecondary" component="p">
        {user.name}
      </Typography>
    </>
  );
}

export { Home };

      // <Typography variant="h5" align="left" color="textPrimary" component="p">
      //   Bem vindo ao Beleza Inteligente
      // </Typography>
      // <Typography variant="h5" align="left" color="textSecondary" component="p">
      //   Faça login para vizualizar seus relatórios!
      // </Typography>