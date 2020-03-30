import React from 'react';
import { Dialog, DialogTitle, DialogContent, CircularProgress, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	content: {
    padding: theme.spacing(3),
    minWidth: '250px',
    minHeight: '150px'
	},
	spinner: {
		display: 'flex',
		justifyContent: 'center'
	}
}));


function LoginComponent(props: {msg?: string}) {
	// @ts-ignore-nextline
  const classes: any = useStyles();
  const { msg } = props;

	return (
		<Dialog
			aria-labelledby="form-dialog-title"
			open={true}
				>
			<DialogTitle id="form-dialog-title">טוען{msg && ` ${msg}`}...</DialogTitle>
			<DialogContent className={classes.content}>
				<div className={classes.spinner}>
					<CircularProgress size={70}/>
				</div>
			</DialogContent>
		</Dialog>
		);
}

export default LoginComponent;