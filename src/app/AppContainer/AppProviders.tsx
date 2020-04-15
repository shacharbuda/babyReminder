import React from 'react';

// Basic Redux Store
import { Provider } from 'react-redux';
import store from '../store';

// Firestore/Firebase - Redux Enhancer
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from '../../config/fbConfig';

// UI providers
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// RTL provider
import RTL from './RTL';

const rrfProps = {
  firebase,
  config: {},
	dispatch: store.dispatch,
	createFirestoreInstance
}


export default function AppProviders({ children } : React.ComponentProps<any>) {
  return (<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
      <RTL>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {children}
        </MuiPickersUtilsProvider>
      </RTL>
		</ReactReduxFirebaseProvider>
  </Provider>)
}