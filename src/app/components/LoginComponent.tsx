import React from 'react';
import { Dialog, DialogTitle, DialogContent, CircularProgress, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	content: {
		padding: theme.spacing(3)
	},
	spinner: {
		display: 'flex',
		justifyContent: 'center'
	}
}));


function LoginComponent(props) {
	// @ts-ignore-nextline
	const classes: any = useStyles();

	return (
		<Dialog
			aria-labelledby="form-dialog-title"
			open={true}
				>
			<DialogTitle id="form-dialog-title">אנא המתיני להתחברות...</DialogTitle>
			<DialogContent className={classes.content}>
				<div className={classes.spinner}>
					<CircularProgress/>
				</div>
			</DialogContent>
		</Dialog>
		);
}

export default LoginComponent;