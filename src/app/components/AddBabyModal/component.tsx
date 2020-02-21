import React from 'react';
import { BabyNew } from '../../interfaces';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers';

interface Props {
	// From container
	addNewBaby: (newBaby: BabyNew) => void;
	// ownProps
	onClose: () => void;
	isOpen: boolean;
};

interface State extends BabyNew {
	nameInput: string;
}

export class AddBabyModal extends React.Component<Props, State> {	
	fields: {label: string, handler: string, rows: number, required: boolean}[];
	
	constructor(props: Props) {
		super(props);

		const labels = [
			"שם תינוק",
			"גן ילדים",
			"מידע נוסף על התינוק"
		];
		const handlers = ['name', 'garden', 'comments'];
		const rows = [0, 0, 4]

		this.fields = handlers.map((handler, i) => ({label: labels[i], handler, rows: rows[i], required: handler !== 'comments'}))

		this.state = {
			birthdate: new Date(),
			seenReminders: [],
			firstName: '',
			lastName: '',
			garden: '',
			comments: '',
			nameInput: ''
		}
	}

	handleTextChange = (handler: string) => ({target}) => {
		if (handler === 'name') {
			// Notice: we assume only name change happens here..
			const splitted = target.value.split(' ');
			const firstName = splitted[0];
			const lastName = splitted.length > 2 ? splitted.slice(1).join(' ') : '';
			this.setState({
				nameInput: target.value,
				firstName,
				lastName
			})
		} else {
			(this.setState as any)({[handler]: target.value});
		}
		
	}

	handleBirthdayChange = (date) => {
		this.setState({birthdate: date});
	}

	handleSubmit = () => {
		const newBaby = {
			...this.state
		}
		// TODO: find something nicer..
		delete newBaby.nameInput;

		if (!newBaby.firstName) {
			return alert('חובה להזין שם תינוק!');
		}

		this.props.addNewBaby(newBaby);
	}

	closeModal = () => {
		this.props.onClose();
	}

	render() {
		const { isOpen } = this.props;

		return (
			<Dialog
				aria-labelledby="form-dialog-title"
				open={isOpen}
				onClose={this.closeModal}
				onSubmit={this.handleSubmit}
				 >
        <DialogTitle id="form-dialog-title">הוספת תינוק {this.state.nameInput}</DialogTitle>
        <DialogContent>
					{
						this.fields.map(f => (
							<TextField
								key={`field_${f.label}`}
								margin="normal"
								label={f.label}
								type="text"
								required={f.required}
								multiline={!!f.rows}
								rows={f.rows}
								value={this.state[f.handler]}
								onChange={this.handleTextChange(f.handler)}
								variant="outlined"
								fullWidth
							/>
						))
					}

  		<DatePicker
				required
				label="תאריך לידה"
				inputVariant="outlined"
				margin="normal"
				disableFuture
				fullWidth
				animateYearScrolling
				format="dd/MM/yyyy"
        value={this.state.birthdate}
				onChange={this.handleBirthdayChange}
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="secondary">
            בטל
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            הוסף
          </Button>
        </DialogActions>
      </Dialog>
			);
	}
}