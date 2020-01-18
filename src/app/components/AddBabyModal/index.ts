import { connect } from 'react-redux';
import { AddBabyModal } from './component';
import { Baby } from '../../interfaces';

interface Props {
	isOpen: boolean;
	onClose: () => void;
};


const mapDispatchToProps = (dispatch, ownProps: Props) => ({
	addNewBaby: (newBaby: Baby) => {
		console.log('here we need to add new baby');
		console.log(newBaby);
		// dispatch()
		if (ownProps.onClose) ownProps.onClose();
	}
})

export default connect(null, mapDispatchToProps)(AddBabyModal)