import { connect } from 'react-redux';
import { BabyDataRow } from './component';

const mapStateToProps = (state) => ({
	reminders: state.reminder
});

export default connect(mapStateToProps)(BabyDataRow)