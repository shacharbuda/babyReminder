import React from 'react';
import './AppContainer.css';
import consts from '../utils/constants';
import BabiesDataTableContainer from '../components/BabiesDataTable';
import LoginComponent from '../components/LoginComponent';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';
import { Fab } from '@material-ui/core';
import util from '../utils/util';

interface Props {
  isLoggedIn: boolean;
  isLoading: boolean;
  displayName: string;
  authUser: () => void;
  signOut: () => void;
  analytics: {
    mount: () => void,
    fotterClick: () => void
  };
  handleVersion: () => void;
}

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
    const { isLoading, isLoggedIn, displayName, analytics, signOut } = this.props;

    if (isLoading || !isLoggedIn) {
      return (		
          <LoginComponent/>
      )
    }

    return (      
          <div className="App">
            {/* TODO: component */}
            <header className="container d-flex justify-content-between">
              <h1 className="m-auto text-center">תינוק תזכורת</h1>
              <h5 className="m-auto text-center">{util.getTimeInDayGreet()}<br />{displayName}!</h5>
            </header>
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