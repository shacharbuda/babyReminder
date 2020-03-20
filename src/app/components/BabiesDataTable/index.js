import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { COLLECTIONS } from '../../utils/constants';

const mapStateToProps = (state) => {
	const babies = state.firestore.ordered[COLLECTIONS.BABIES] || []
	const onlyDateableBabies = babies.filter(b => b.birthdate)
	return {
		babies: onlyDateableBabies,
		isLoading: !isLoaded(state.firestore.data[COLLECTIONS.BABIES])
	}
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(() => [
		{
			collection: COLLECTIONS.BABIES,
			orderBy: [['garden', 'asc'], ['firstName', 'asc']]
		}
	])
)(BabiesDataTableComponent)