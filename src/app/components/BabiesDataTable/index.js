import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { COLLECTIONS } from '../../utils/constants';

const mapStateToProps = (state) => {
	const { uid } = state.firebase.auth;
	const babies = state.firestore.ordered[COLLECTIONS.BABIES] || []
	const onlyDateableBabies = babies.filter(b => b.birthdate)
	return {
		uid,
		babies: onlyDateableBabies,
		isLoading: !isLoaded(state.firestore.data[COLLECTIONS.BABIES])
	}
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect((props) => [
		{
			collection: COLLECTIONS.BABIES,
			orderBy: [['garden', 'asc'], ['firstName', 'asc']],
			where: [["uid", "==", props.uid]]
		}
	])
)(BabiesDataTableComponent)