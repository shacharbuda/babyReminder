import { connect } from 'react-redux';
import { addReminder, removeReminder } from '../../store/actions';
import { EditBabyComponent } from './component';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const babyPath = 'currentBaby';
const reminderPath = 'currentReminder';

const mapStateToProps = (state) => ({
	baby: state.firestore.ordered[babyPath] && state.firestore.ordered[babyPath][0],
	reminder: state.firestore.ordered[reminderPath] && state.firestore.ordered[reminderPath][0]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	updateReminder: (isSeen) => {
		const {babyId, reminderId} = ownProps.pickedBabyReminder;
		const payload = {
			babyId,
			reminderId
		};

		if (isSeen) {
			dispatch(addReminder(payload));
		} else {
			dispatch(removeReminder(payload));
		}
	}
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((ownProps) => [
		{
			collection: 'babies',
			doc: ownProps.pickedBabyReminder.babyId,
			storeAs: babyPath
		},
		{
			collection: 'reminders',
			doc: ownProps.pickedBabyReminder.reminderId,
			storeAs: reminderPath
		},
	])
)(EditBabyComponent);