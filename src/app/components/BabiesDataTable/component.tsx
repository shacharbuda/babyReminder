import React from 'react';
import { Baby } from '../../interfaces';
import { BabyDataRow } from '../BabyDataRow';
import EditBabyContainer from '../EditBaby';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Theme, withStyles, StyledComponentProps, WithStyles } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
	babies: Baby[];
};

interface State {
	pickedBabyReminder: {
		babyId: number,
		reminderId: number
	} | null
}

class BabiesDataTableComponentA extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			pickedBabyReminder: null
		};
	}

	onReminderChoose = (reminderId: number, babyId: number) => {
		this.setState({pickedBabyReminder: {
			reminderId,
			babyId
		}});
	}
	
	render() {
		return (
			<div className="h-100 w-100">
			<TableContainer className="h-100 w-100" component={Paper}>
				<Table aria-label="simple table">
					<TableHead >
						<TableRow>
							<TableCell className={this.props.classes.head}>שם</TableCell>
							<TableCell className={this.props.classes.head}>תאריך לידה</TableCell>
							<TableCell className={this.props.classes.head}>תזכורת הבאה</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.babies.map((baby, babyId) => (
							<BabyDataRow key={`BabyRow_${babyId}`} baby={baby} id={babyId} onReminderClick={this.onReminderChoose} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
				{this.state.pickedBabyReminder &&
				<EditBabyContainer isOpen={!!this.state.pickedBabyReminder} onClose={() => this.setState({pickedBabyReminder: null})} pickedBabyReminder={this.state.pickedBabyReminder} />}
			</div>
		);
	}
}

const styles = (theme: Theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontWeight: 1000,
		fontSize: '1.2rem'
	}
})

export const BabiesDataTableComponent = withStyles(styles)(BabiesDataTableComponentA);