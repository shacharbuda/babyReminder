import { connect } from 'react-redux';
import { BabyDataRow } from './component';
import { Dispatch } from 'redux';
import { removeBaby } from '../../store/actions';

const mapStateToProps = (state) => ({
	reminders: state.reminder
});

const mapDistpatchToProps = (dispatch: Dispatch) => ({
	removeBaby: (id: number) => dispatch(removeBaby(id))
})

export default connect(mapStateToProps, mapDistpatchToProps)(BabyDataRow)