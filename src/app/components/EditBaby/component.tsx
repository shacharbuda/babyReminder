import React from 'react';
import { Baby, Reminder } from '../../interfaces';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'

interface Props {
	// From container
	reminder: Reminder;
	baby: Baby;
	// ownProps
	onClose: () => void;
	isOpen: boolean;
};

interface State {
	isSeen: boolean;
}

export class EditBabyComponent extends React.Component<Props, State> {	
	constructor(props: Props) {
		super(props);
		const { baby: {seenReminders}, reminder } = props;

		this.state = {
			isSeen: seenReminders.includes(reminder.id)
		}
	}

	handleSubmit = () => {
		const isSeenChecked = this.state.isSeen;
		(this.props as any).updateReminder(isSeenChecked);

		// Return to home.
		this.closeModal();
	}

	closeModal = () => {
		this.props.onClose();
	}

	render() {
		const { isOpen, baby, reminder } = this.props;

		return (
			<Dialog
				aria-labelledby="form-dialog-title"
				open={isOpen}
				onClose={this.closeModal}
				onSubmit={this.handleSubmit}
				 >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
					<div className="form-group text-right text-info">
						<label htmlFor="baby-name">שם תינוק</label>
						<input type="text" value={baby.name} readOnly className="form-control" id="baby-name"/>
					</div>
					<div className="form-group text-right text-info">
						<label htmlFor="baby-birthday">תאריך לידה</label>
						<input type="date" readOnly value={baby.birthdate.toISOString().slice(0,10)} className="form-control" id="baby-birthday"/>
					</div>
					<div className="form-group text-right text-info">
						<label htmlFor="reminder-months">גיל הופעת תזכורת (חודשים)</label>
						<input type="text" readOnly value={reminder.months} className="form-control" id="reminder-months" aria-describedby="reminder-months-help"/>
						<small id="reminder-months-help" className="form-text text-muted">בעתיד יהיה ניתן לערוך שדה זה.</small>
					</div>
					<div className="form-group text-right text-info">
						<label htmlFor="reminder-name">שם תזכורת</label>
						<input type="text" readOnly value={reminder.name} className="form-control" id="reminder-name"/>
					</div>
					<div className="form-check text-right text-info form-check">
						<input checked={this.state.isSeen} onChange={({target}) => this.setState({isSeen: target.checked})} type="checkbox" className="form-check-input" id="reminder-seen"/>
						<label className="form-check-label mr-3" htmlFor="reminder-seen">סיימתי עם התזכורת</label>
					</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="primary">
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