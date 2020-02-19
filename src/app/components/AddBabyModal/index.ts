import { connect } from 'react-redux';
import { AddBabyModal } from './component';
import { BabyNew } from '../../interfaces';
import { addBaby, sortBabies } from '../../store/actions';

interface Props {
	isOpen: boolean;
	onClose: () => void;
};


const mapDispatchToProps = (dispatch, ownProps: Props) => ({
	addNewBaby: async (newBaby: BabyNew) => {
		await dispatch(addBaby(newBaby));
		// Sort for new baby..
		await dispatch(sortBabies());
		if (ownProps.onClose) ownProps.onClose();
	}
})

export default connect(null, mapDispatchToProps)(AddBabyModal)