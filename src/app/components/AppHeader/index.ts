import { connect } from 'react-redux';
import { AppHeader as Component } from './component';

const mapStateToProps = (state: any) => ({
  displayName: state.firebase.auth.displayName
})

export default connect(mapStateToProps)(Component)