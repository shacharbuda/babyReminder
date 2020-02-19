import { connect } from 'react-redux';
import { addReminder, removeReminder } from '../../store/actions';
import { EditBabyComponent } from './component';

interface Props {
	pickedBabyReminder: {
		babyId: number,
		reminderId: number
	},
	isOpen: boolean;
	onClose: () => void;
};

const mapStateToProps = (state, ownProps: Props) => ({
	// TODO: get from db. delete all state!
	baby: state.baby.find(b => b.id === ownProps.pickedBabyReminder.babyId),
	reminder: state.reminder.find(r => r.id === ownProps.pickedBabyReminder.reminderId)
});

const mapDispatchToProps = (dispatch, ownProps: Props) => ({
	updateReminder: (isSeen: boolean) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBabyComponent)