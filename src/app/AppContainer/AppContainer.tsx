import React from 'react';
import './AppContainer.css';
import LoginComponent from '../components/LoginComponent';
import AppHeader from '../components/AppHeader';
import AppBody from '../components/AppBody';
import AppFooter from '../components/AppFooter';
import LogOutComponent from '../components/LogOut';
import { messagingOnTokenRefresh } from '../../config/fbConfig';

class AppContainer extends React.Component<Props, {}> {
  messagingTokenSubscribe;

  componentDidMount() {
    const { analytics, handleVersion } = this.props;
    analytics.mount();
    handleVersion();
  }

  componentWillUnmount() {
    if (this.messagingTokenSubscribe) {
      console.log('in unsubsribe');
      this.messagingTokenSubscribe();
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { isLoggedIn, isLoading, authUser } = this.props; 
    
    // Nothing to do here if still loading..
    if (isLoading) return;

    // If login changed to logged out - log in!
    if (!isLoggedIn) {
      authUser();
    } else if (prevProps.isLoggedIn !== isLoggedIn) {
      // Invoke onLoggedIn when first recognized as logged in
      this.onUserLoggedIn();
    }
  }

  onUserLoggedIn = async () => {
    const { onRecieveUserData } = this.props; 

    await onRecieveUserData();

    this.messagingTokenSubscribe = messagingOnTokenRefresh(() => {
      onRecieveUserData();
    })
  }

  render() {
    const { isLoading, isLoggedIn, analytics } = this.props;

    if (isLoading || !isLoggedIn) {
      return (		
          <LoginComponent/>
      )
    }

    return (      
          <div className="App">
            <AppHeader />
            <AppBody />
            <AppFooter onClick={analytics.fotterClick} />
            {
              isLoggedIn &&
              <LogOutComponent />
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
  analytics: {
    mount: () => void,
    fotterClick: () => void
  };
  handleVersion: () => void;
  onRecieveUserData: () => Promise<void>;
}