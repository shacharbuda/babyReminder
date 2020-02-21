import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const mapStateToProps = (state) => {
	const babies = state.firestore.ordered.babies || []
	const onlyDateableBabies = babies.filter(b => b.birthdate)
	return {
		babies: onlyDateableBabies
	}
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(() => [
		{
			collection: 'babies',
			orderBy: [['garden', 'asc'], ['firstName', 'asc']]
		}
	])
)(BabiesDataTableComponent)