import React, { useState, useEffect } from 'react';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Report } from 'powerbi-report-component';

import { accountService, userService } from '../../services';
import { reportsBI } from '../../helpers';

const useStyles = makeStyles((theme) => ({
	grid: {
		flexGrow: 1,
		paddingTop: 5,
	},
	button: {
		margin: theme.spacing(1),
		fontSize: 16,
		padding: '6px 12px',
		width: 200,
		lineHeight: 1.5,
	},
}));

function DetailDashboard() {
	const classes = useStyles();
	const [tokenData, setTokenData] = useState([]);
	const [report, setReport] = useState(null);
	const user = accountService.userValue;

	const reportStyle = {
		height: '85vh'
	};

	const basicFilter = {
		$schema: "http://powerbi.com/product/schema#basic",
		target: {
			table: "Usuarios",
			column: "Usuario"
		},
		operator: "Is",
		values: [user.name],
		filterType: 1
	};

	const renderSettings = {
		filterPaneEnabled: false,
		//navContentPaneEnabled: false,
	};

	function printReport() {
		if (report) report.print();
	}

	useEffect(() => {

		userService.getEmbedTokenBI()
			.then(res => {
				res.data.embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=' + reportsBI.reportID + '&groupId=' + reportsBI.groupID;
				res.data.reportId = reportsBI.reportID;

				setTokenData(res.data);
			})
			.catch(error => {
				console.log('Erro: ' + error.response.data);
			});
	}, []);

	return (
		<>
			<Grid height='100%'>
				<Grid item className={classes.grid}>
					{tokenData.embedToken == null || tokenData.embedToken.length === 0 ? (
						<p>Carregando dados do relatório...</p>
					) : (
							<Report embedType="report"
								tokenType='AAD'
								accessToken={tokenData.embedToken}
								embedUrl={tokenData.embedUrl}
								embedId={tokenData.reportId}
								permissions='View'
								style={reportStyle}
								extraSettings={renderSettings}
								onLoad={(report) => {
									setReport(report);
									report.setFilters([basicFilter]).catch((errors) => {
										console.log(errors);
									});
								}}
							/>
						)}
				</Grid>
				{/* <Grid container justify="flex-end">
					<Button
						type="submit"
						color="primary"
						size="medium"
						variant="contained"
						className={classes.button}
						onClick={printReport}
					>Imprimir Relatório</Button>
				</Grid> */}
			</Grid>
		</>
	);
}

export { DetailDashboard };
