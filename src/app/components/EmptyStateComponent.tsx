import React from 'react';
import { Theme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
	imgBig: {
		maxWidth: '100%',
		height: 'auto'
	},
	imgSmall: {
		maxWidth: '50%',
		height: 'auto'
	}
}));


function EmptyStateComponent(props: React.ComponentProps<"div">) {
	// @ts-ignore-nextline
	const classes: any = useStyles();
	const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'xl'));
	const imgClass = isDesktop ? classes.imgSmall : classes.imgBig;

	return (
		<div className={`${classes.textCenter} ${classes.verticalCenter}`}>
			<div className={classes.textCenter}>
				<img className={imgClass} src="empty-state.jpg" alt="no-data"></img>
			</div>
			{props.children}
			<span className="small">Photos designed by <a href="http://www.freepik.com">slidesgo / Freepik</a></span>
		</div>
		);
}

export default EmptyStateComponent;