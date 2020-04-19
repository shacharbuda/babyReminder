import { analytics, authUser } from '../../config/fbConfig';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import AppComponent from './AppContainer';
import persistence from '../utils/persistence'
import { sendUserData } from '../store/actions';

const mapStateToProps = (state: any) => ({
  isLoading: !isLoaded(state.firebase.auth),
  isLoggedIn: !state.firebase.auth.isEmpty
});

// Not all here are related to store but still passed as I really wanted to use
// the container structure like this. If you don't like it, well.. That's a bummer.
const mapDispatchToProps = (dispatch) => ({
  authUser,
  onRecieveUserData: async () => await dispatch(sendUserData()),
  analytics: {
    mount: () => analytics('APP_MOUNTED'),
    fotterClick: () => analytics('CLICK_ON_FOOTER')
  },
  handleVersion: persistence.handleVersion
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
