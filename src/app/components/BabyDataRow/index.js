import { connect } from 'react-redux';
import { BabyDataRow as BabyDataRowComponent } from './component';
import { removeBaby } from '../../store/actions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const mapStateToProps = (state) => ({
	reminders: state.firestore.ordered.reminders
});

const mapDistpatchToProps = (dispatch) => ({
	removeBaby: (id) => dispatch(removeBaby(id))
})

export default compose(
	connect(mapStateToProps, mapDistpatchToProps),
	firestoreConnect(() => [
		{
			collection: 'reminders',
			orderBy: ['months', 'asc']
		}
	])
)(BabyDataRowComponent)