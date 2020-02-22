import React from 'react';
import { Baby, Reminder } from '../../interfaces';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Checkbox, FormControlLabel, CircularProgress } from '@material-ui/core'

interface Props {
	// From container
	reminder: Reminder;
	baby: Baby;
	updateReminder: (isSeen: boolean) => void;
	// ownProps
	onClose: () => void;
	isOpen: boolean;
};

interface State {
	isSeen: boolean;
	fields: {label: string, value: string | number}[];
}

export class EditBabyComponent extends React.Component<Props, State> {	
	constructor(props: Props) {
		super(props);
		this.state = {
			isSeen: undefined,
			fields: undefined
		}
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { baby: prevBaby, reminder: prevReminder } = prevProps;
		const { baby: currBaby, reminder: currReminder } = this.props;
		const isStateInitialized = !!prevState.fields;

		// We use this function here to initalize state for upcoming data only.
		if (isStateInitialized) return;


		if (currBaby && currReminder) {
			const labels = [
				"שם תינוק",
				"תאריך לידה",
				"גיל הופעת התזכורת (חודשים)",
				"שם תזכורת"
			];
			const values = [`${currBaby.firstName}${currBaby.lastName ? ` ${currBaby.lastName}` : ''}`, currBaby.birthdate.toDate().toISOString().slice(0,10), currReminder.months, currReminder.name];
	
			const fields = values.map((value, i) => ({label: labels[i], value}))
	
			this.setState({
				fields, 
				isSeen: currBaby.seenReminders.map(r => r.id).includes(currReminder.id)
			});
		}
	}

	handleSubmit = () => {
		const isSeenChecked = this.state.isSeen;
		this.props.updateReminder(isSeenChecked);

		// Return to home.
		this.closeModal();
	}

	closeModal = () => {
		this.props.onClose();
	}

	render() {
		const { isOpen, baby, reminder } = this.props;
		const { isSeen, fields } = this.state;
		const isLoaded = !!fields;

		if (!isLoaded) {
			return (
				<Dialog
				aria-labelledby="form-dialog-title"
				open={isOpen}
				onClose={this.closeModal}
				 >
	        <DialogTitle id="form-dialog-title">טוען...</DialogTitle>
					<DialogContent>
					 <CircularProgress />
					</DialogContent>
				 </Dialog>
			)
		}

		return (
			<Dialog
				aria-labelledby="form-dialog-title"
				open={isOpen}
				onClose={this.closeModal}
				onSubmit={this.handleSubmit}
				 >
        <DialogTitle id="form-dialog-title">תינוק {baby.firstName} - תזכורת {reminder.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            כאן ניתן לערוך פרטי התזכורת. כרגע הכוונה היא רק ל'סיימתי עם התזכורת'.
          </DialogContentText>
					{
						fields.map(f => (
							<TextField
								key={`field_${f.label}`}
								margin="normal"
								label={f.label}
								type="text"
								value={f.value}
								variant="outlined"
								inputProps={{
									readOnly: true,
									disabled: true,
									color: 'rgba(0, 0, 0, 0.87)'
								}}
								fullWidth
							/>
						))
					}

				{
					baby.comments &&
				<TextField
					margin="normal"
					label="מידע נוסף"
					inputProps={{
						readOnly: true,
						disabled: true,
						color: 'rgba(0, 0, 0, 0.87)'
					}}
					value={baby.comments}
					fullWidth
          multiline
					variant="outlined"
					rows={4}
        />}

				<FormControlLabel
					control={
						<Checkbox
							autoFocus
							checked={isSeen}
							onChange={({target}) => this.setState({isSeen: target.checked})}
							color="primary"
						/>
					}
					label="סיימתי עם התזכורת"
				/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="secondary">
            בטל
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            עדכן
          </Button>
        </DialogActions>
      </Dialog>
			);
	}
}