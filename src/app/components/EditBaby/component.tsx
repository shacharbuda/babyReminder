import React from 'react';
import { Baby, Reminder } from '../../interfaces';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Checkbox, FormControlLabel } from '@material-ui/core'

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
}

export class EditBabyComponent extends React.Component<Props, State> {	
	fields: {label: string, value: string | number}[];
	
	constructor(props: Props) {
		super(props);
		const { baby, reminder } = props;

		const labels = [
			"שם תינוק",
			"תאריך לידה",
			"גיל הופעת התזכורת (חודשים)",
			"שם תזכורת"
		];
		const values = [baby.name, baby.birthdate.toISOString().slice(0,10), reminder.months, reminder.name];

		this.fields = values.map((value, i) => ({label: labels[i], value}))

		this.state = {
			isSeen: baby.seenReminders.includes(reminder.id)
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
		const { isSeen } = this.state;

		return (
			<Dialog
				aria-labelledby="form-dialog-title"
				open={isOpen}
				onClose={this.closeModal}
				onSubmit={this.handleSubmit}
				 >
        <DialogTitle id="form-dialog-title">תינוק {baby.name} - תזכורת {reminder.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            כאן ניתן לערוך פרטי התזכורת. כרגע הכוונה היא רק ל'סיימתי עם התזכורת'.
          </DialogContentText>
					{
						this.fields.map(f => (
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