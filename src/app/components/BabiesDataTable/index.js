import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';
import { sortBabies } from '../../store/actions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const mapStateToProps = (state) => {
	const babies = state.firestore.ordered.babies || []
	const onlyDateableBabies = babies.filter(b => b.birthdate)
	return {
		babies: onlyDateableBabies
	}
};

// TODO: delete irrelevent.
const mapDispatchToProps = (dispatch) => ({
	sortBabies: () => dispatch(sortBabies())
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(() => [
		{
			collection: 'babies',
			orderBy: [['garden', 'asc'], ['firstName', 'asc']]
		}
	])
)(BabiesDataTableComponent)