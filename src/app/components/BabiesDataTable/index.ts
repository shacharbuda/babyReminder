import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';

const mapStateToProps = (state) => ({
	babies: state.baby
});

export default connect(mapStateToProps)(BabiesDataTableComponent)