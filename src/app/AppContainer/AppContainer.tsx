import React from 'react';
import './AppContainer.css';
import consts from '../utils/constants';
import BabiesDataTableContainer from '../components/BabiesDataTable';
import LoginComponent from '../components/LoginComponent';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';
import { Fab } from '@material-ui/core';
import AppHeader from '../components/AppHeader';

class AppContainer extends React.Component<Props, {}> {
  componentDidMount() {
    const { analytics, handleVersion } = this.props;
    analytics.mount();
    handleVersion();
  }

  componentDidUpdate(prevProps: Props) {
    const { isLoggedIn, isLoading, authUser } = this.props; 
    
    // Nothing to do here if still loading..
    if (isLoading) return;

    // If login changed to logged out - log in!
    if (!isLoggedIn) {
      authUser();
    }
  }

  render() {
    const { isLoading, isLoggedIn, analytics, signOut } = this.props;

    if (isLoading || !isLoggedIn) {
      return (		
          <LoginComponent/>
      )
    }

    return (      
          <div className="App">
            <AppHeader />
            {/* TODO: component */}
            <div className="container d-flex align-items-center body-content">
                <BabiesDataTableContainer />
            </div>
            {/* TODO: component */}
            <footer onClick={analytics.fotterClick} className="ltr text-center blockquote-footer">
              Made by Waffle (v{consts.APP_VERSION})
            </footer>
            {
              isLoggedIn &&
              <div
                style={{ position: 'fixed', bottom: '1em', right: '1em'}}
              >
                {/* TODO: component */}
                <Fab onClick={signOut} color="secondary" aria-label="edit">
                  <LogoutIcon />
                </Fab>
              </div>
            }
        </div>
    );
  }
}

export default AppContainer;

interface Props {
  isLoggedIn: boolean;
  isLoading: boolean;
  authUser: () => void;
  signOut: () => void;
  analytics: {
    mount: () => void,
    fotterClick: () => void
  };
  handleVersion: () => void;
}