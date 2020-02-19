import { connect } from 'react-redux';
import { BabyDataRow } from './component';
import { removeBaby } from '../../store/actions';

const mapStateToProps = (state) => ({
	reminders: state.reminder
});

const mapDistpatchToProps = (dispatch) => ({
	removeBaby: (id) => dispatch(removeBaby(id))
})

export default connect(mapStateToProps, mapDistpatchToProps)(BabyDataRow)