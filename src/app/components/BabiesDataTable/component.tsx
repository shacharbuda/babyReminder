import React from 'react';
import { Baby } from '../../interfaces';
import BabyDataRowContainer from '../BabyDataRow';
import EditBabyContainer from '../EditBaby';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, withStyles, WithStyles, createStyles, Button } from '@material-ui/core';
import AddBabyModal from '../AddBabyModal';
import _ from 'lodash';

interface Props extends WithStyles<typeof styles> {
	babies: Baby[];
	sortBabies: () => void;
};

interface State {
	pickedBabyReminder: {
		babyId: number,
		reminderId: number
	} | null;
	addBabyClick: boolean;
}

class BabiesDataTableComponentA extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			pickedBabyReminder: null,
			addBabyClick: false
		};
	}
	// TODO: del
	dupsIds;

	componentDidMount() {
		const { sortBabies } = this.props;

		sortBabies();

	// TODO: del

		const {babies} = this.props;
		const dups = _.filter(babies, (val, i, iteratee) => _.find(iteratee, b => b.id === val.id, i + 1));
		const dupsIds = _.map(dups as Baby[], b => b.id);
		this.dupsIds = dupsIds;
		const messedUpBabies = _.filter(babies, baby => _.includes(dupsIds, baby.id));
		const messedUpNames = _.map(messedUpBabies, baby => `${baby.name} שבגן ${baby.garden ? baby.garden : 'לא ידוע'}`);
		alert(messedUpNames.join('\n') + '\nסה"כ ' + messedUpBabies.length + ' שצריך למחוק');
	}

	isMess = (id) =>_.includes(this.dupsIds, id);

	onReminderChoose = (reminderId: number, babyId: number) => {
		this.setState({pickedBabyReminder: {
			reminderId,
			babyId
		}});
	}
	
	render() {
		const { classes } = this.props;

		return (
			<div className="h-100 w-100">
				<TableContainer className={classes.tblContainer}>
					<Table padding="checkbox" stickyHeader aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center" className={classes.head}>שם</TableCell>
								<TableCell align="center" className={classes.head}>תאריך לידה</TableCell>
								<TableCell align="center" className={classes.head}>גן ילדים</TableCell>
								<TableCell align="center" className={classes.head}>תזכורת הבאה</TableCell>
								<TableCell align="center" className={classes.head}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.babies.map((baby) => (
	// TODO: del

								<BabyDataRowContainer key={`BabyRow_${baby.id}`} isMess={this.isMess(baby.id)} baby={baby} onReminderClick={this.onReminderChoose} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<div className={classes.controllers}>
					<Button onClick={() => this.setState({addBabyClick: true})} variant="outlined">הוסף תינוק</Button>
				</div>
				{this.state.pickedBabyReminder &&
				<EditBabyContainer isOpen={!!this.state.pickedBabyReminder} onClose={() => this.setState({pickedBabyReminder: null})} pickedBabyReminder={this.state.pickedBabyReminder} />}
				{
					this.state.addBabyClick &&
					<AddBabyModal isOpen={this.state.addBabyClick} onClose={() => this.setState({addBabyClick: false})} />
				}
			</div>
		);
	}
}


const CONTROLLERS_HEIGHT = '15%';

const styles = (theme: Theme) => createStyles({
	head: {
		fontWeight: 1000,
		fontSize: '1.2rem',
		borderBottom: '1px solid rgba(0, 0, 0, 0.4)'
	},
	tblContainer: {
		width: '100%',
		height: `calc(100% - ${CONTROLLERS_HEIGHT})`,
		overflowX: 'hidden',
		overflowY: 'auto'
	},
	controllers: {
		height: CONTROLLERS_HEIGHT,
		textAlign: 'center',
		paddingTop: '7%'
	}
})

export const BabiesDataTableComponent = withStyles(styles)(BabiesDataTableComponentA);