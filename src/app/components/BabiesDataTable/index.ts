import { connect } from 'react-redux';
import { BabiesDataTableComponent } from './component';
import { sortBabies } from '../../store/actions';

const mapStateToProps = (state) => ({
	babies: state.baby
});

const mapDispatchToProps = (dispatch) => ({
	sortBabies: () => dispatch(sortBabies())
});

export default connect(mapStateToProps, mapDispatchToProps)(BabiesDataTableComponent)