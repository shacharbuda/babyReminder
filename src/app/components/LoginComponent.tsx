import React from 'react';
import { Dialog, DialogTitle, DialogContent, CircularProgress } from '@material-ui/core';

export default class LoginComponent extends React.Component<{}, {}> {

	render() {
		return (
			<Dialog
				aria-labelledby="form-dialog-title"
				open={true}
				 >
        <DialogTitle id="form-dialog-title">אנא המתיני להתחברות...</DialogTitle>
        <DialogContent>
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<CircularProgress/>
					</div>
				</DialogContent>
      </Dialog>
			);
	}
}