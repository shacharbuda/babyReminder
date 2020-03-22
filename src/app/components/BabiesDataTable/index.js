import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { COLLECTIONS } from '../../utils/constants';

const mapStateToProps = (state) => {
	const { firebase, firestore } = state;
	const { BABIES: babiesCollection } = COLLECTIONS;

	const { uid } = firebase.auth;
	const babies = firestore.ordered[babiesCollection] || []
	const onlyDateableBabies = babies.filter(b => b.birthdate)
	return {
		uid,
		babies: onlyDateableBabies,
		isLoading: !isLoaded(firestore.data[babiesCollection]),
		isEmpty: isEmpty(firestore.data[babiesCollection])
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