import React from "react";
import MaterialTable from "material-table";
import tableIcons from "../helpers/TableIcons.js";

export default function AppTable({ data, columns, ...rest }) {
  return (
    <MaterialTable
      {...rest}
      title=""
      icons={tableIcons}
      columns={columns}
      data={data}
      localization={{
        header: {
          actions: '',
        },
        body: {
          emptyDataSourceMessage: 'Nenhum registro para exibir!',
          editRow: {
            deleteText: 'Você tem certeza que quer deletar este registro?',
          },
        },
        toolbar: {
          searchTooltip: 'Pesquisar',
          searchPlaceholder: 'Pesquisar',
        },
        pagination: {
          labelRowsSelect: 'linhas',
          labelDisplayedRows: '{count} de {from}-{to}',
          firstTooltip: 'Primeira página',
          previousTooltip: 'Página anterior',
          nextTooltip: 'Próxima página',
          lastTooltip: 'Última página',
        },
      }}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};