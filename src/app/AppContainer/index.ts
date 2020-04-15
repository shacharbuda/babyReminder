import { analytics, authUser, signOut } from '../../config/fbConfig';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import AppComponent from './AppContainer';
import persistence from '../utils/persistence'

const mapStateToProps = (state: any) => ({
  isLoading: !isLoaded(state.firebase.auth),
  isLoggedIn: !state.firebase.auth.isEmpty
});

// Those aren't related to store but still passed as I really wanted to use
// the container structure like this. If you don't like it, well.. That's a bummer.
const propsToPass = () => ({
  authUser,
  signOut,
  analytics: {
    mount: () => analytics('APP_MOUNTED'),
    fotterClick: () => analytics('CLICK_ON_FOOTER')
  },
  handleVersion: persistence.handleVersion
});

export default connect(mapStateToProps, propsToPass)(AppComponent);
