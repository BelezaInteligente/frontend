import React from 'react';

import { Typography } from '@material-ui/core';

function Footer() {
  return (
    <div style={{ maxWidth: 700, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="caption" align={'center'}>
        Desenvolvido por Eduardo Kraus Nunes - ekrausnunes@gmail.com © Copyright 2020
      </Typography>
    </div>
  );
}

export { Footer };
