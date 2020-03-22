import React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	verticalCenter: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		width: '100%'
	},
	textCenter: {
		textAlign: 'center',
		'& > *':	{
			textAlign: 'center'
		}
	},
	img: {
		maxWidth: '100%',
		maxHeight: '100%'
	}
}));


function EmptyStateComponent(props: React.ComponentProps<"div">) {
	// @ts-ignore-nextline
	const classes: any = useStyles();

	return (
		<div className={`${classes.textCenter} ${classes.verticalCenter}`}>
			<div className={classes.textCenter}>
				<img className={classes.img} src="empty-state.jpg" alt="no-data"></img>
			</div>
			{props.children}
			<span className="small">Photos designed by <a href="http://www.freepik.com">slidesgo / Freepik</a></span>
		</div>
		);
}

export default EmptyStateComponent;