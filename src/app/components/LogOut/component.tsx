import React from 'react';
import { WithStyles, Fab, withStyles } from '@material-ui/core';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';

interface Props extends WithStyles<typeof styles> {
	onClick: (ev: any) => void
};

class LogOutComponent extends React.Component<Props> {
	render() {
    const { classes, onClick } = this.props;
		return (
			<div className={classes.root}>
        <Fab onClick={onClick} color="secondary" aria-label="edit">
          <LogoutIcon />
        </Fab>
      </div>
		);
	}
}

const styles = {
	root: {
    position: 'fixed' as 'fixed',
    bottom: '1em',
    left: '1em'
  }
};

export default withStyles(styles)(LogOutComponent)