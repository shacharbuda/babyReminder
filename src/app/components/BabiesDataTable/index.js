import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';
import { sortBabies } from '../../store/actions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const mapStateToProps = (state) => ({
	babies: state.firestore.ordered.babies || []
});

// TODO: delete irrelevent.
const mapDispatchToProps = (dispatch) => ({
	sortBabies: () => dispatch(sortBabies())
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(() => ['babies'])
)(BabiesDataTableComponent)