import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { COLLECTIONS } from '../../utils/constants';

const mapStateToProps = (state) => {
	const babies = state.firestore.ordered[COLLECTIONS.BABIES] || []
	const onlyDateableBabies = babies.filter(b => b.birthdate)
	return {
		babies: onlyDateableBabies
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