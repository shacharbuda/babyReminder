import { connect } from 'react-redux';
import { BabyDataRow as BabyDataRowComponent } from './component';
import { removeBaby } from '../../store/actions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { COLLECTIONS } from '../../utils/constants';

const mapStateToProps = (state) => ({
	uid: state.firebase.auth.uid,
	reminders: state.firestore.ordered[COLLECTIONS.REMINDERS]
});

const mapDistpatchToProps = (dispatch) => ({
	removeBaby: (id) => dispatch(removeBaby(id))
})

export default compose(
	connect(mapStateToProps, mapDistpatchToProps),
	firestoreConnect((props) => [
		{
			collection: COLLECTIONS.REMINDERS,
			orderBy: ['months', 'asc'],
			where: [["uid", "==", props.uid]]
		}
	])
)(BabyDataRowComponent)